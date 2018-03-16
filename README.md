
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
#### 项目启动
>第一步

进入server/config目录配置相关信息，包括七牛云账号，MongoDB地址（如果没有加入权限，用户名，密码等。默认是本地的27017端口）启动项目端口等等
进入src/config 七牛云的地址

以上配置，可以都不配置，项目也能跑起来，但是没有数据。。所以如果没有七牛的话，去注册一个。。。

>第二步

yarn or npm 

>第三步

全局安装开发神器  [parcel](http://www.css88.com/doc/parcel/getting_started.html)

>第四步

启动命令

```
爬取豆瓣数据到本地

npm run movie


爬取每个豆瓣列表的的视频

npm run trailer


查看数据库数据

npm run api


将图片和视频上传到七牛

npm run qiniu


前端启动项目

npm run dev


打包前端项目

npm run build


node服务 启动命令

npm run server
```

因为没数据，所以建议先去爬去数据， ``npm run qiniu``这个命令不用执行，因为害怕豆瓣那边地址改变造成图片和视频加载失败所以上传到七牛，
### 前端
框架基于``react``，ui模板基于阿里的``antd``，重点是利用require的特性可以实现懒加载项目具体看``src/components/async_load.js``
### 后端
基于``koa2+mongoose``
#### mongoose

由于mongoose几个版本的api的使用方式不同，如果使用最新的话，请查看官网
#### koa2

项目中使用了很多的函数式编程，如果不了解的建议买一本[javaScript函数式编程](http://product.dangdang.com/23742619.html)，还有一些es6的知识建议看[阮一峰老师的es6入门](http://es6.ruanyifeng.com/#docs/decorator)，重点看 修饰器函数， 这也许是 三个简单项目中最重要的一个知识点，因为这个提案可以叫我们想java一样写接口，而不用像以前那么苦逼了。
