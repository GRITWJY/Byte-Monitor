const router = require("koa-router")();
router.get("/", async function (ctx, next) {
  ctx.body = {
    msg: "θΏζ₯ζε",
    code: 0,
  };
});

module.exports = router;
