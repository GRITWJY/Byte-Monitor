const router = require("koa-router")();
const db = require("../utils/db");
router.prefix("/monitor");

router.post("/data", async function (ctx, next) {
  const data = ctx.request.body;
  console.log(data);
  const sql = `insert into member values(null,${data.email},${data.pwd},null,${data.token});`;
  const { msg, code } = await db.addData(sql);
  ctx.body = {
    msg,
    code,
  };
});
module.exports = router;
