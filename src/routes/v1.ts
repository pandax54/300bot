import Router from 'koa-router'
import type { Context } from 'koa'
import * as controllers from '../controllers/v1'

const router = new Router<{}, Context>()

router.get("/", async (ctx) => {
  ctx.body = "connected";
});

// --- OAuth ----------------
router.get('/oauth/discord/connect', controllers.oath.connect)


// --- Users ----------------
router.get("/users", controllers.users.findAll)


export const v1Routes = router.routes()
