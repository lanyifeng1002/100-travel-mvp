# Amazing 100 Journeys

Amazing 100 Journeys 是一个轻量级的旅行目的地展示与管理项目，面向“发现目的地灵感、浏览详情、快速比较、持续维护内容”这一类典型场景。

项目当前已经完成：

- 精选目的地首页
- 关键词搜索与标签筛选
- 随机探索
- 目的地详情页与相关推荐
- 基于 Express + SQLite 的后端接口
- 内容管理页，可新增目的地
- 自动化测试与基础部署文件

## 技术选型

- Frontend: Vue 3 + Vue Router + Vite
- Backend: Express 5
- Database: SQLite + better-sqlite3
- Testing: Node `node:test`

## 本地运行

安装依赖：

```bash
npm install
```

重置数据库并灌入种子数据：

```bash
npm run db:reset
```

启动开发环境：

```bash
npm run dev
```

启动后默认地址：

- 前台：`http://localhost:5173`
- 后端：`http://localhost:3000`

构建生产版本：

```bash
npm run build
```

运行测试：

```bash
npm test
```

启动生产服务：

```bash
npm run start
```

## 页面说明

- `/`：目的地首页
- `/travel/:slug`：目的地详情页
- `/admin`：内容管理页

## 关键目录

- `src/views`：页面视图
- `src/components`：通用组件
- `src/data/travels.js`：种子数据
- `server/index.js`：服务入口
- `server/db`：数据库初始化与连接
- `server/repositories`：查询与写入逻辑
- `tests`：自动化测试
- `docs`：项目文档

## 文档目录

以下说明文档已经整理到 `docs` 目录：

- `docs/00-项目概览.md`
- `docs/01-产品需求.md`
- `docs/02-接口说明.md`
- `docs/03-AI协作记录.md`
- `docs/04-开发说明.md`
- `docs/05-维护指南.md`

## 后续可扩展方向

- 后台编辑与删除能力
- 用户登录和权限控制
- 图片上传与内容审核
- 正式线上部署与独立云数据库
