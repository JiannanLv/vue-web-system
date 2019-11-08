<!--
 * @Description: 
 * @Author: jiannan.lv
 * @Date: 2019-10-15 09:01:30
 * @LastEditTime: 2019-11-08 14:44:10
 * @LastEditors: jiannan.lv
 -->

# 开发

## 简介

```
    基于vue开发的项目示例，内容包含：
    1、用户登录页
    2、主页：主要包含流程列表，以及流程的增删改查及查看详情，可以通过拖拉拽的形式实现流程。
    3、用户列表：主要包含用户增删改查。
    4、图表模块：主要包含了echarts、high-charts和d3画图表的方法示例。
    5、公用组件：主要包含日常常用组件，有待完善。
    6、Mock数据：主要通过mock数据模拟后台,实现增删改查。
```
## 后台模块

```
    项目登录、主页和用户列表页都依赖于后台。启动项目前, 需要一些准备工作：
    1、安装mysql
    Win10安装文档：https://blog.csdn.net/lvkelly/article/details/102901489
    2、创建数据库
    代码里的数据库名称：sequelize_study
    3、后台代码 koa + Sequelize实现后台逻辑
    代码地址：https://github.com/JiannanLv/node-koa-server。
    创建好数据库后，Sequelize是基于ORM机制，直接运行后台代码即可直接在数据库里建表及添加字段。

```
## 技术栈

```
    后台技术栈：koa + Sequelize + node + mysql
    前端技术栈：vue + vuex + vue-router + iview + echarts + high-charts + d3 + svg
```

## 安装依赖

```
    npm install 
```

## 修改配置: config
```
    const development = {
        host: 'localhost',
        port: 2019
    };
    const production = {
        host: 'localhost',
        port: 8020
    };
```

## 启动命令

```
    // 运行一次即可
    npm run dll

    // 每次启动需要运行
    npm start
```

## 启动mock命令

```
    Mock数据模块需要依赖于项目里的mock服务，需要同时启动。
    启动命令： npm run mock:server
```

## 打包命令

```
    npm run deploy:prod
```

## 访问地址

```
    http://localhost:2019
```
