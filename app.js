import Koa from 'koa';
import logUtil from'./utils/log_util';
import json from'koa-json';
import convert from'koa-convert';
import koaBody from 'koa-body';
import logger from 'koa-logger';
import cors from 'koa2-cors';

import design from'./routes/design';

const app = new Koa();

app.use(koaBody());
app.use(cors({
    // origin: function (ctx) {
    //     return ['http://localhost:8000','http://106.14.210.21:8080']; // 这样就能只允许 http://localhost:8080 这个域名的请求了
    //     // return 'http://106.14.210.21:8080'; // 这样就能只允许 http://localhost:8080 这个域名的请求了
    // },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization','cookies','path'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
})); //使用cors
app.use(json());
app.use(convert(logger()));
// logger
app.use(async (ctx, next) => {
    //响应开始时间
    const start = new Date();
    //响应间隔时间
    let ms;
    try {
        //开始进入到下一个中间件
        await next();
        ms = new Date() - start;
        //记录响应日志
        logUtil.logResponse(ctx, ms);
    } catch (error) {
        ms = new Date() - start;
        //记录异常日志
        logUtil.logError(ctx, error, ms);
    }
});


/***
 * 路由配置模块--------------------------------->
 * ***/
app.use(design.routes());
/***
 * 路由配置模块--------------------------------->
 * ***/
app.use(design.allowedMethods());

module.exports =  app;
