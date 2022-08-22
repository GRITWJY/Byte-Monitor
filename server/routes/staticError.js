const router = require("koa-router")();
const db = require("../utils/db");
router.prefix("/staticError");

router.get("/getpiedata", async function (ctx, next) {
  const sql =
    "select selector,count(*) from error where type='static' group by selector;";
  const result = await db.selectData(sql); //数据库连接获取数据
  //ctx.body赋值后就是回传给前端的数据了
  ctx.body = result
});

router.get("/getbardata", async function (ctx, next) {
  //写你需要的参数 * 代表获取全部数据 where是条件判断
  //注意！！数字参数可以不用引号，字符参数是需要的包括模板字符串外还要套一个引号
  const sql =
    "select create_time,count(*) from error where type='static' group by create_time;";
  const ressult = await db.selectData(sql); //数据库连接获取数据
  //ctx.body赋值后就是回传给前端的数据了
  ctx.body = ressult;
});

router.get("/getcount", async function (ctx, next) {
  //count*是获取全部静态错误的总数 count(distinct xxx)是获取某一列不重复的数目
  const countSql =
    "select count (*),count(distinct user_id) from error where type='static';";
  const result = await db.selectData(countSql);
  ctx.body = result;
});

router.get("/gettabledata", async function (ctx, next) {
  //选择指定的内容传回去，groupby可以把相同的page，及我的静态资源错误的URL相同的放在一起（功能就是相同错误不分开展示）
  //max（create_time）用于获取最新的一次错误发生时间
  const tableSql =
    "select id,page,selector,count(*),count(distinct user_id),max(create_time) from error where type='static' group by page;";
  const result = await db.selectData(tableSql);
  ctx.body = result;
});

router.get("/getdetail", async function (ctx, next) {
  const {page} = ctx.request.query;//解构获取get请求url？后的数据
  const sql = `select * from error where type='static' and page=${page};`;
  const result = await db.selectData(sql);
  ctx.body =result
});

module.exports = router;
