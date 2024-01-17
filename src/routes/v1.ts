import Router from 'koa-router'
import type { Context } from 'koa'
import * as controllers from '../controllers/v1'

const router = new Router<{}, Context>()

router.get("/", async (ctx) => {
  ctx.body = `Hello World! ${new Date()} ${process.env.NODE_ENV} ${process.env.PORT} ${process.env.URL}`
});

// --- OAuth ----------------
router.get('/oauth/discord/connect', controllers.oath.connect)
router.post('/oauth/discord/connect', controllers.oath.connect)


// --- Users ----------------
router.get("/users", controllers.users.findAll)


export const v1Routes = router.routes()
