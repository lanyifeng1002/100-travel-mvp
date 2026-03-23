# API 文档

## 1. 基础信息

- 本地开发服务地址：`http://localhost:3000`
- 接口统一前缀：`/api`
- 数据格式：JSON

## 2. 通用响应说明

成功时返回 JSON 数据对象或数组。

失败时返回：

```json
{
  "error": "错误信息"
}
```

## 3. 接口列表

### 3.1 健康检查

`GET /api/health`

作用：

- 检查服务状态
- 返回数据库路径和统计信息

示例响应：

```json
{
  "status": "ok",
  "databaseFilePath": "D:/.../server/db/travel-mvp.sqlite",
  "totalTravels": 100,
  "totalRegions": 7,
  "totalTags": 20
}
```

### 3.2 获取全部标签

`GET /api/tags`

示例响应：

```json
["全部", "慢旅行", "摄影强化", "经典路线"]
```

### 3.3 获取目的地列表

`GET /api/travels`

支持参数：

- `q`：关键词
- `tag`：标签名

示例：

`GET /api/travels?q=kyoto&tag=慢旅行`

返回字段：

- `id`
- `slug`
- `name`
- `country`
- `location`
- `region`
- `image`
- `shortDesc`
- `summary`
- `fullDesc`
- `bestTime`
- `duration`
- `budget`
- `tags`
- `idealFor`
- `highlights`
- `tips`

### 3.4 随机获取一个目的地

`GET /api/travels/random`

支持参数：

- `q`
- `tag`

作用：

- 在当前筛选条件下随机返回一个目的地

### 3.5 获取目的地详情

`GET /api/travels/:slug`

示例：

`GET /api/travels/uyuni-salt-flats-first-look`

### 3.6 获取相关推荐

`GET /api/travels/:slug/related`

支持参数：

- `limit`：返回数量，默认 `3`

示例：

`GET /api/travels/uyuni-salt-flats-first-look/related?limit=3`

### 3.7 获取统计信息

`GET /api/stats`

示例响应：

```json
{
  "totalTravels": 100,
  "totalRegions": 7,
  "totalTags": 20
}
```

### 3.8 获取后台最近更新内容

`GET /api/admin/travels`

支持参数：

- `limit`：返回条数，默认 `10`

作用：

- 在内容管理页显示最近录入的条目

### 3.9 新增目的地

`POST /api/admin/travels`

请求体示例：

```json
{
  "slug": "kyoto-editor-pick",
  "name": "京都 · 编辑精选慢游",
  "country": "日本",
  "location": "京都",
  "region": "东亚",
  "image": "https://images.unsplash.com/...",
  "shortDesc": "适合第一次判断自己是否喜欢日式慢旅行的人。",
  "summary": "用红叶、寺院和步行尺度，把旅行节奏放慢。",
  "fullDesc": "这条路线强调步行尺度、文化密度和停留感。",
  "bestTime": "10月下旬 - 11月中旬",
  "duration": "4-6天",
  "budget": "中高预算",
  "tags": ["慢旅行", "文化体验", "秋色"],
  "idealFor": ["第一次去京都的人", "喜欢城市散步的人"],
  "highlights": ["寺院与红叶组合", "街区步行体验"],
  "tips": ["热门季节提前订房", "核心寺院尽量避开周末上午"]
}
```

校验规则：

- `slug` 必填，且只能是小写字母、数字和中划线
- `image` 必须是 `http` 或 `https` 链接
- `tags`、`idealFor`、`highlights`、`tips` 至少各有一项
- `slug` 不能重复

成功时返回新建的目的地对象。

## 4. 数据流说明

前台页面调用 `src/api/travelApi.js` 中的方法，请求会发到 `server/index.js`，再由 `server/repositories/travelRepository.js` 处理查询和写入逻辑，最终落到 SQLite 数据库。

## 5. 数据库初始化入口

数据库初始化和灌库文件：

- `server/db/initDatabase.js`
- `server/scripts/resetDatabase.js`

常用命令：

```bash
npm run db:reset
```
