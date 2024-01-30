import * as core from "express-serve-static-core";
import express from "express";
import { webhooks } from "./webhooks";

export const setupServer = (): core.Express => {
  const app: core.Express = express();
  app.use(express.json());
  webhooks().registerHandlers(app);
  return app;
};
