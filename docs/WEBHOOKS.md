# [Telegram Git Events]

## Webhook Setup

Create webhooks using following guide from GitHub:

https://docs.github.com/en/webhooks/using-webhooks/creating-webhooks

Configure your server to receive the webhook under XYZ.com/github-event in order for everything to function correctly.

```typescript
const registerGitHubHandlers = (app: core.Express) => {
  app.post("/github-event", handleGithubWebhook);
};
```
