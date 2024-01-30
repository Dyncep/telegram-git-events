import TelegramBot from "node-telegram-bot-api";
import { exitWithError } from "../utils";
import { APP_CONSTANTS } from "../constants";
import { PushWebhookPayload } from "../github/webhook.types";
import { BOT_MESSAGES } from "./messages";

export class TelegramGitEventsBot extends TelegramBot {
  constructor() {
    console.log("Bootstrapping Telegram Bot...");
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
    if (!TELEGRAM_BOT_TOKEN || TELEGRAM_BOT_TOKEN.length <= 0) {
      exitWithError(APP_CONSTANTS.TELEGRAM_TOKEN_NOT_FOUND);
    }

    super(TELEGRAM_BOT_TOKEN, {
      polling: true,
    });
  }

  private groupId = () => {
    return process.env.TELEGRAM_ALERT_CHANNEL_ID!;
  };

  private notifyOfPushCreationEvent = (payload: PushWebhookPayload) => {
    this.sendMessage(this.groupId(), BOT_MESSAGES.PushCreationEvent(payload), {
      parse_mode: "HTML",
    })
      .then((e) => {
        console.log("Notified Of Push Creation Event In Alert Channel!");
      })
      .catch((e) => {
        console.error(
          "Failed To Notify Of Push Creation Event In Alert Channel",
        );
      });
  };

  private notifyOfPushDeletionEvent = (payload: PushWebhookPayload) => {
    this.sendMessage(this.groupId(), BOT_MESSAGES.PushDeletionEvent(payload), {
      parse_mode: "HTML",
    })
      .then((e) => {
        console.log("Notified Of Push Deletion Event In Alert Channel!");
      })
      .catch((e) => {
        console.error(
          "Failed To Notify Of Push Deletion Event In Alert Channel",
        );
      });
  };

  private notifyOfDefaultPushEvent = (payload: PushWebhookPayload) => {
    this.sendMessage(this.groupId(), BOT_MESSAGES.DefaultPushEvent(payload), {
      parse_mode: "HTML",
    })
      .then((e) => {
        console.log("Notified Of Default Push Event In Alert Channel!");
      })
      .catch((e) => {
        console.error(
          "Failed To Notify Of Default Push Event In Alert Channel",
        );
      });
  };

  notifyOfPushEvent = (payload: PushWebhookPayload) => {
    if (payload.created) {
      this.notifyOfPushCreationEvent(payload);
      return;
    }

    if (payload.deleted) {
      this.notifyOfPushDeletionEvent(payload);
      return;
    }

    this.notifyOfDefaultPushEvent(payload);
  };
}
