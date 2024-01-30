import { Request, Response } from "express";
import { PushWebhookPayload } from "../github/webhook.types";
import { App } from "../app";

export const handleGithubWebhook = (req: Request, res: Response) => {
  res.sendStatus(200);
  const eventType = req.headers["x-github-event"] ?? null;
  if (!eventType || eventType !== "push") {
    console.log(`Received GitHub Event of type '${eventType}', skipping...`);
    return;
  }

  console.log(
    "Received GitHub Event of type 'push', triggering telegram notification.",
  );
  App.getInstance()
    .getTgBot()
    .notifyOfPushEvent(req.body as PushWebhookPayload);
};
