import * as core from "express-serve-static-core";
import { handleGithubWebhook } from "./handlers";

export const webhooks = () => {
  const registerGitHubHandlers = (app: core.Express) => {
    app.post("/github-event", handleGithubWebhook);
  };

  const registerHandlers = (app: core.Express) => {
    console.log("Registering Webhook Handlers...");
    registerGitHubHandlers(app);
  };

  return {
    registerHandlers,
  };
};
