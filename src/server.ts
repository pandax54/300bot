// server koa
import Koa from "koa";
import kcors from "kcors";
import koaBody from "koa-body";
import Router from "koa-router";
require("dotenv").config();
import { initializeDb } from "./database";
import { v1Routes } from "./routes/v1";

// @ts-ignore
import koaRespond = require("koa-respond"); // eslint-disable-line @typescript-eslint/no-require-imports
import { botInit } from "./discord-bot";

async function init() {
  const app = new Koa();

  const router = new Router();

  initializeDb();

  app.use(koaRespond());
  app.use(koaBody());
  app.use(kcors({ origin: "*" }));
  app.use(v1Routes);
  app.use(router.allowedMethods());

  app.listen(process.env.PORT, () => {
    console.log(`server is running at ${process.env.URL ?? 'http://localhost'}:${process.env.PORT}`);
  });

  botInit()
}

init();
