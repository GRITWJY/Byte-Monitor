const sdkModel = require("../model/m-sdk");
const response = require("../utils/response");

exports.addData = async (ctx) => {
  let data = ctx.request.body;

  await Promise.all(
    data.map((da) => {
      switch (JSON.parse(da.category)) {
        case "error":
          return sdkModel.addJSError(da);
        case "behavior":
          return sdkModel.addBehavior(da);
        case "xhr":
          return sdkModel.addXHR(da);
        case "router":
          return sdkModel.addRoute(da);
        case "performance":
          return sdkModel.addPerformance(da);
        default:
          return [];
      }
    })
  )
    .then((res) => {
      response.success(ctx, res);
    })
    .catch((err) => {
      response.error(ctx, err);
      ctx.body = err;
    });
};

exports.saveUser = async (ctx) => {
  let data = ctx.request.body;

  await sdkModel
    .selectUser(data)
    .then((res) => {
      if (res.length) {
        response.success(ctx);
      } else {
        sdkModel.saveUser(data).then((res2) => {
          response.success(ctx, res2);
        });
      }
    })
    .catch((err) => {
      response.error(ctx, err);
    });
};
