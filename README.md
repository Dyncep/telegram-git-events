## Telegram Git Events

This repository was created on the fly.
The purpose of this program is to be notified of GitHub events in a telegram chat.

Supported events currently only include push events.

### Environment configuration

Configure your telegram bot token.
Configure the telegram group id where you wish to receive the events.
Configure the server port which defaults to 3000.

```
TELEGRAM_BOT_TOKEN=
TELEGRAM_ALERT_CHANNEL_ID=
SERVER_PORT=3000
```

### Webhook Setup

Create webhooks using following guide from GitHub:
https://docs.github.com/en/webhooks/using-webhooks/creating-webhooks

Configure your server to receive the webhook under XYZ.com/github-event in order for everything to function correctly.

```typescript
const registerGitHubHandlers = (app: core.Express) => {
  app.post("/github-event", handleGithubWebhook);
};
```
