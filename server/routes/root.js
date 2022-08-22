const router = require("koa-router")();
router.get("/", async function (ctx, next) {
  ctx.body = {
    msg: "连接成功",
    code: 0,
  };
});

module.exports = router;
