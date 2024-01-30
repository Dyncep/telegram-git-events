import * as core from "express-serve-static-core";
import { TelegramGitEventsBot } from "./telegram/bot";
import { setupServer } from "./server/setup";

export class App {
  private expressApp: core.Express;
  private tgBot: TelegramGitEventsBot;

  private static app: App;

  private constructor() {
    this.expressApp = setupServer();
    this.tgBot = new TelegramGitEventsBot();
  }

  static getInstance = () => {
    if (!App.app) {
      console.log("Bootstrapping App Singleton...");
      App.app = new App();
    }
    return App.app;
  };

  run = () => {
    this.expressApp.listen(process.env.PORT || 3000, () =>
      console.log(`Application listening on port ${process.env.PORT || 3000}`),
    );
  };

  getExpressApp = () => this.expressApp;
  getTgBot = () => this.tgBot;
}
