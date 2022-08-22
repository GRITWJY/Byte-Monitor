let db = require("../utils/db");
const query = db.query;

// 添加JS错误
exports.addJSError = (data) => {
  let { userId, appId, msg, type, selector, extra = null, page, stack } = data;
  stack = JSON.stringify(stack);
  extra = JSON.stringify(extra);
  let _sql = `INSERT INTO error (user_id, app_id, msg, type, selector, extra, page, stack) VALUES (${userId},${appId},${msg},${type},${selector},${extra},${page},${stack})`;
  return query(_sql, []);
};

exports.addXHR = (data) => {
  let {
    userId,
    appId,
    duration,
    endTime,
    method,
    params = "{}",
    response = "{}",
    startTime,
    status,
    success,
    type,
    url,
  } = data;

  params = JSON.stringify(params);
  response = JSON.stringify(response);

  let _sql = `
        INSERT INTO xhr (user_id, app_id, status, duration, url, success, method, params, response, start_time, end_time)
        VALUES
        (
          ${userId},
          ${appId},
          ${status},
          ${duration},
          ${url},
          ${success},
          ${method},
          ${params},
          ${response},
          ${startTime},
          ${endTime}
        )
    `;

  return query(_sql, []);
};

exports.addPerformance = (data) => {
  let {
    DOMContentLoaded,
    FCP,
    FP,
    LCP,
    appId,
    userId,
    dns,
    duration,
    isCache,
    load,
    page,
    protocol,
    redirect,
    resourceName,
    resourceSize,
    responseBodySize,
    sourceType,
    ttfb,
    timestamp,
  } = data;

  let _sql = `
        INSERT INTO performance 
        ( user_id, app_id,
         DOMContentLoaded,
          FCP, 
          FP, 
          LCP, 
          dns, 
          duration, 
          isCache, 
          load_time, 
          page, 
          protocol, 
          redirect, 
          resourceName, 
          resourceSize, 
          responseBodySize,
          sourceType, 
          ttfb, 
          timestamp
        )
        VALUES
        (
          ${userId},
          ${appId},
          ${DOMContentLoaded},
          ${FCP},
          ${FP},
          ${LCP},
          ${dns},
          ${duration},
          ${isCache},
          ${load},
          ${page},
          ${protocol},
          ${redirect},
          ${resourceName},
          ${resourceSize},
          ${responseBodySize},
          ${sourceType},
          ${ttfb},
          ${timestamp}
        )
    `;
  return query(_sql, []);
};

// 路由跳转
exports.addRoute = (data) => {
  let { userId, appId, duration, page, timestamp, from, to, params, query } =
    data;

  let _sql = `
        INSERT INTO router (user_id, app_id, duration, page, timestamp,from, to, params, query)
        VALUES
        (
          ${userId},
          ${appId},
          ${duration},
          ${page},
          ${timestamp},
          ${from},
          ${to},
          ${params},
          ${query}
        )
    `;

  return query(_sql, []);
};

// 行为
exports.addBehavior = (data) => {
  let {
    userId,
    appId,
    eventType,
    height,
    innerHTML,
    left,
    outerHTML,
    page,
    pageHeight,
    paths,
    scrollTop,
    subType,
    target,
    timestamp,
    top,
    viewport,
    width,
  } = data;

  paths = JSON.stringify(paths);
  viewport = JSON.stringify(viewport);
  let _sql = `
        INSERT INTO behavior (
            user_id,
             app_id, 
             eventType, 
             height,
            innerHTML,
            left_x,
            outerHTML,
            page,
            pageHeight,
            paths,
            scrollTop,
            subType,
            target,
            timestamp,
            top,
            viewport,
            width)
        
        VALUES
        (
            ${userId},
            ${appId},
            ${eventType},
            ${height},
            ${innerHTML},
            ${left},
            ${outerHTML},
            ${page},
            ${pageHeight},
            ${paths},
            ${scrollTop},
            ${subType},
            ${target},
            ${timestamp},
            ${top},
            ${viewport},
            ${width}
        )
    `;

  return query(_sql, []);
};

exports.selectUser = (data) => {
  let { userId, appId } = data;

  let _sql = `
        SELECT * from user where id = '${userId}' AND app_id = '${appId}' 
    `;
  return query(_sql, []);
};

exports.saveUser = (data) => {
  let { userId, appId, userAgent, screen } = data;

  let _sql = `
        INSERT INTO user (id, app_id, useragent, screen) 
        VALUES 
               (
               '${userId}',
               '${appId}',
               '${JSON.stringify(userAgent)}',
               '${screen}'
               ) 
    `;
  return query(_sql, []);
};
