
### 基于express的简单的博客[express-blog](https://github.com/zhanglongdream/nodeJs/tree/express-blog)

### 基于koa2的爬虫，豆瓣项目[koa2-crawler-豆瓣](https://github.com/zhanglongdream/nodeJs/tree/master)

#### 项目目录
```
├── server                  后端
│   ├── config              项目配置
│   │   └── env
│   ├── crawler
│   ├── database
│   │   └── schema
│   ├── decorator
│   ├── middleware
│   ├── routes
│   ├── service
│   └── tasks                爬虫
│       └── crawler
└── src                      前端
```
##### 项目启动
> 进入server/config目录配置相关信息，包括七牛云账号，MongoDB地址（如果没有加入权限，用户名，密码等。默认是本地的27017端口）启动项目端口等等

> yarn or npm 
> 可能有点慢。。。

>全局安装 parcel [parcel](http://www.css88.com/doc/parcel/getting_started.html)


```
node 启动命令
npm run server

爬取豆瓣数据到本地
npm run movie

爬取每个豆瓣列表的的视频

npm run trailer

数据库数据

npm run api

将图片和视频上传到七牛

npm run qiniu

前端启动项目
npm run dev
打包前端项目
npm run build
```
