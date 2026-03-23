# 部署方案

## 目标

Amazing 100 Journeys 当前已经具备最小完整部署条件：

- 前端由 Vite 构建到 `dist`
- 后端由 Express 提供 API 和静态文件托管
- 数据库使用本地 SQLite 文件 `server/db/travel-mvp.sqlite`
- 容器启动时会自动检查并初始化数据库

## 推荐部署形态

最稳妥的方式是单容器部署：

1. 构建前端产物
2. 启动 Express
3. Express 同时托管 `dist` 和 `/api`
4. 将 `server/db` 挂到持久化存储，避免重启后丢失录入数据

这适合轻量内容平台、内部演示环境和独立部署的小型应用。

## 本地容器验证

构建镜像：

```bash
docker build -t amazing-100-journeys .
```

启动容器：

```bash
docker run -p 3000:3000 -v amazing_100_journeys_data:/app/server/db amazing-100-journeys
```

启动后访问：

- `http://localhost:3000`
- `http://localhost:3000/api/health`

## 部署检查表

- Node 版本满足 `^20.19.0 || >=22.12.0`
- 生产环境开放 `PORT`
- 持久化目录包含 `/app/server/db`
- 首次部署后访问 `/api/health`，确认返回 `status: ok`
- 访问首页确认静态资源可加载
- 访问 `/admin` 确认可录入新内容

## 数据持久化注意事项

项目当前使用 SQLite，本地文件就是数据库。只要部署环境满足下面两点，就可以稳定运行：

- 应用进程对 `server/db` 有写权限
- 这个目录使用持久化卷，而不是临时文件系统

如果后续需要多人并发录入、审计日志或云数据库，再升级到独立数据库服务。
