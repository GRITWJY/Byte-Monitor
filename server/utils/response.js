/**
 * 成功的数据
 * @param ctx
 * @param data
 * @param msg
 * @param code
 */
function success(ctx, data = {}, msg = "success", code = 20000) {
  ctx.body = {
    code,
    msg,
    data,
  };
}

/**
 * 失败的数据
 * @param ctx
 * @param msg
 * @param data
 * @param code
 */
function error(ctx, msg = "失败", data = {}, code = 0) {
  ctx.body = {
    msg,
    code,
    data,
  };
}

exports.success = success;
exports.error = error;
