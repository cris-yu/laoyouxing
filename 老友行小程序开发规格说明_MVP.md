# 老友行小程序开发规格说明（MVP 版）

> 目标：本说明文档可直接交给 AI / 工程同学，用于实现老友行微信小程序的 MVP 版本。

---

## 0. 项目概述

- 项目名：**老友行小程序**
- 小程序展示名（建议）：**老友行 – 给爸妈的 AI 旅伴**
- 目标平台：**微信小程序**
- 核心角色：
  - `child`：子女端（帮父母订行程 & 远程查看）
  - `traveler`：出行人端（父母，大字版 + AI 旅伴）
- 关键特性：
  - 首屏角色选择 → 登录 → 进入不同首页
  - 子女端：浏览线路、AI 行程顾问、下单、查看行程状态
  - 出行人端：查看当日行程、听讲解、AI 问答、一键求助
- 后端形态：默认使用自有 RESTful API（Node/Java/Python 均可），本说明只约定接口协议及数据结构。

---

## 1. 技术与目录结构约定

### 1.1 小程序技术栈

- 原生微信小程序
- 语言：TypeScript（推荐）或 JavaScript
- 状态管理：
  - 使用 `App.globalData` 存储全局 user/role 信息
  - 可封装简单 store 模块（非必须）

### 1.2 后端技术栈（可由 AI 自主选择）

- RESTful API + JSON 返回
- 鉴权：HTTP Header 携带 `Authorization: Bearer <token>`
- 部署：任意云服务器 / 云函数，保持接口路径与协议一致即可。

---

## 2. 路由与页面结构

小程序仅一个应用，通过角色切换展示不同「壳」。

### 2.1 `app.json` pages 列表（建议）

```jsonc
{
  "pages": [
    "pages/role-select/index",            // 角色选择页 P0

    "pages/child/home/index",             // 子女首页：线路列表 P1-1
    "pages/child/product-detail/index",   // 线路详情 P1-2
    "pages/child/order-confirm/index",    // 下单确认 P1-3
    "pages/child/orders/index",           // 子女订单列表 P1-4
    "pages/child/order-detail/index",     // 订单详情 + 安心视图 P1-5
    "pages/child/family/index",           // 家人档案列表 P1-6
    "pages/child/family-edit/index",      // 家人档案编辑 P1-6-1
    "pages/child/profile/index",          // 子女个人中心 P1-7

    "pages/traveler/home/index",          // 出行人首页：我的行程 P2-1
    "pages/traveler/ai-companion/index",  // AI 旅伴对话页 P2-2
    "pages/traveler/settings/index"       // 出行人设置 P2-5
  ]
}
```

> 建议：子女端使用 tabBar 导航；出行人端不使用 tabBar，从首页跳转至 AI 旅伴和设置。

---

## 3. 全局状态与登录 / 角色切换

### 3.1 全局数据结构（示例）

```ts
interface GlobalUser {
  id: string;
  role: "child" | "traveler" | null;
  nickname?: string;
  avatarUrl?: string;
  phone?: string;
  token?: string;
}

interface GlobalState {
  user: GlobalUser | null;
  lastRole: "child" | "traveler" | null;
}

App<{
  globalData: GlobalState;
}>({})
```

- `token` / `lastRole` 需持久化到本地：
  - `wx.setStorageSync('token')`
  - `wx.setStorageSync('lastRole')`

### 3.2 小程序启动流程

1. `app.onLaunch`：
   - 从本地读取 `token` 和 `lastRole`
   - 若存在 `token`，调用 `GET /api/auth/me` 验证
2. 若 `token` 有效且 `lastRole` 存在：
   - `role === 'child'` → `wx.reLaunch` 到 `pages/child/home/index`
   - `role === 'traveler'` → `wx.reLaunch` 到 `pages/traveler/home/index`
3. 否则，`wx.reLaunch` 到 `pages/role-select/index`

> 从分享卡片打开时，若路径参数包含 `orderId`、`travelerName`，则优先按出行人端流程处理（见 6.3）。

---

## 4. 数据模型定义

以下 TypeScript 接口为推荐结构，后端与前端可共用。

### 4.1 用户与家人档案

```ts
// 平台用户（子女 / 出行人）
interface User {
  id: string;
  openId: string;
  unionId?: string;
  role: "child" | "traveler" | null;
  nickname?: string;
  avatarUrl?: string;
  phone?: string;
  createdAt: string;
}

// 家人/出行人档案（由子女创建）
interface FamilyProfile {
  id: string;
  userId: string;   // 子女用户 id
  name: string;     // 称呼/名字，如“妈妈”
  relation: string; // “母亲”“父亲”“阿姨”等
  gender?: "male" | "female" | "other";
  ageRange: "50-59" | "60-69" | "70+";
  healthConditions: string[];     // ["high_blood_pressure","knee_problem"]
  activityLevel: "low" | "medium" | "high";
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
```

### 4.2 线路产品

```ts
interface TripProduct {
  id: string;
  name: string;
  coverImage: string;
  priceFrom: number;      // 起价
  days: number;           // 行程天数
  departureCity: string;
  destinationCity: string;
  tags: string[];         // ["一日游","巴士","含午餐"]

  // 适老标签
  ageRange: string;                     // 如 "50-70"
  intensity: "low" | "medium" | "high"; // 行程强度
  intensityDescription: string;         // 人话描述
  medicalLevel: "near_clinic" | "near_hospital" | "basic";
  medicalDescription: string;
  maxSingleRideHours: number;           // 最长单次车程（小时）

  itinerary: TripDay[];                 // 行程按天拆分

  description: string;
  included: string[];
  excluded: string[];
  status: "online" | "offline";
}

interface TripDay {
  dayIndex: number;       // 1,2,3...
  title: string;          // 如“抵达 & 市区游”
  schedule: TripSegment[];
}

interface TripSegment {
  id: string;
  time: string;           // "08:00-10:00"
  type: "transfer" | "sightseeing" | "meal" | "rest" | "other";
  title: string;          // "前往颐和园"
  description: string;
  poiName?: string;
  poiId?: string;
  latitude?: number;
  longitude?: number;
  isKey?: boolean;        // 是否关键节点（集合点）
  hasAudioGuide?: boolean;// 是否有讲解
}
```

### 4.3 订单与行程状态

```ts
interface OrderTraveler {
  id: string;
  familyProfileId?: string;
  name: string;
  phone?: string;
  idNumber?: string;
  isPrimary: boolean;   // 主要出行人
}

interface Order {
  id: string;
  orderNo: string;
  childUserId: string;
  productId: string;
  productSnapshot: TripProduct;
  departureDate: string;   // "2025-10-01"
  status: "pending" | "paid" | "canceled" | "completed";
  totalPrice: number;
  travelers: OrderTraveler[];
  createdAt: string;
  paidAt?: string;
}

// 行程实时状态，用于子女安心视图和父母端
interface TripRuntime {
  orderId: string;
  currentDayIndex: number;
  currentSegmentIndex: number;
  status: "not_started" | "in_progress" | "finished";
  lastUpdateAt: string;
  summaryText: string;           // 例如“妈妈正在颐和园游览，大约 16:00 返程”
  currentLocationLabel?: string; // 如“颐和园景区”
}
```

### 4.4 求助事件

```ts
interface HelpRequest {
  id: string;
  orderId: string;
  travelerName: string;
  travelerPhone?: string;
  createdAt: string;
  status: "open" | "in_progress" | "resolved";
  lastUpdateAt: string;
  notes?: string;
}
```

---

## 5. API 设计

统一返回结构：

```ts
interface ApiResponse<T> {
  code: number;      // 0=成功，其它=错误
  message: string;
  data?: T;
}
```

基地址示例：`https://api.laoyouxing.com`。

### 5.1 认证 / 用户

#### 5.1.1 小程序登录

`POST /api/auth/login`

请求：

```json
{
  "code": "wx_login_code",
  "role": "child"
}
```

响应：

```json
{
  "code": 0,
  "message": "ok",
  "data": {
    "token": "JWT_OR_OTHERS",
    "user": {
      "id": "u_123",
      "role": "child",
      "nickname": "张三",
      "avatarUrl": ""
    }
  }
}
```

#### 5.1.2 获取当前用户

`GET /api/auth/me`  
Header：`Authorization: Bearer <token>`

---

### 5.2 家人档案（子女端）

#### 5.2.1 列表

`GET /api/family`

响应：

```json
{
  "code": 0,
  "data": [
    {
      "id": "f_1",
      "name": "妈妈",
      "relation": "母亲",
      "ageRange": "60-69",
      "healthConditions": ["high_blood_pressure"],
      "activityLevel": "medium"
    }
  ]
}
```

#### 5.2.2 创建

`POST /api/family`

```json
{
  "name": "妈妈",
  "relation": "母亲",
  "ageRange": "60-69",
  "healthConditions": ["high_blood_pressure"],
  "activityLevel": "medium",
  "notes": "膝盖不好"
}
```

#### 5.2.3 更新

`PUT /api/family/:id`  
请求体与创建相同。

---

### 5.3 线路 / 产品

#### 5.3.1 列表

`GET /api/products`

Query：

- `departureCity?`
- `date?`
- `intensity?` (`low` / `medium` / `high`)

#### 5.3.2 详情

`GET /api/products/:id`

返回 `TripProduct`。

---

### 5.4 AI 行程顾问（子女端）

`POST /api/ai/trip-advisor`

请求：

```json
{
  "productId": "p_123",
  "familyProfileId": "f_1"
}
```

响应（后端调用大模型生成）：

```json
{
  "code": 0,
  "data": {
    "suitability": "mostly_ok",
    "headline": "总体适合妈妈，但第二天步行略多",
    "details": [
      "第 2 天有较长上坡路，建议准备护膝。",
      "单次车程不超过 2 小时。"
    ],
    "adviceForChild": "若妈妈膝盖不适，可考虑轻松版线路或准备登山杖。"
  }
}
```

`suitability` 枚举：`"ok" | "mostly_ok" | "not_recommended"`。

---

### 5.5 订单与支付

> 实际支付需要接微信支付 SDK，本节只定义业务接口。

#### 5.5.1 预下单

`POST /api/orders/preview`

```json
{
  "productId": "p_123",
  "departureDate": "2025-10-01",
  "travelers": [
    { "familyProfileId": "f_1" }
  ]
}
```

响应：

```json
{
  "code": 0,
  "data": {
    "totalPrice": 999,
    "items": [
      {
        "type": "trip",
        "amount": 999
      }
    ]
  }
}
```

#### 5.5.2 创建订单

`POST /api/orders`

```json
{
  "productId": "p_123",
  "departureDate": "2025-10-01",
  "travelers": [
    {
      "familyProfileId": "f_1",
      "name": "张妈妈",
      "isPrimary": true
    }
  ],
  "totalPrice": 999
}
```

响应：

```json
{
  "code": 0,
  "data": {
    "orderId": "o_123",
    "payment": {
      "nonceStr": "...",
      "timeStamp": "...",
      "package": "...",
      "signType": "MD5",
      "paySign": "..."
    }
  }
}
```

小程序前端使用 `wx.requestPayment` 调起支付。

#### 5.5.3 子女端订单列表

`GET /api/orders?status=in_progress`

返回 `Order[]`。

#### 5.5.4 订单详情

`GET /api/orders/:id`

返回：

```ts
{
  order: Order,
  runtime: TripRuntime | null
}
```

---

### 5.6 行程实时状态

`GET /api/trip-runtime/:orderId`

返回 `TripRuntime`。

---

### 5.7 出行人端：行程绑定与查询

#### 5.7.1 通过分享卡片绑定

小程序路径示例：

```txt
/pages/traveler/home/index?orderId=o_123&travelerName=张妈妈
```

页面加载时：

- 读取 `orderId`、`travelerName`
- 调用：`GET /api/traveler/trip?orderId=o_123&travelerName=张妈妈`

`GET /api/traveler/trip` 响应：

```json
{
  "code": 0,
  "data": {
    "orderId": "o_123",
    "travelerName": "张妈妈",
    "productName": "颐和园一日游",
    "todayTitle": "颐和园一日游",
    "todaySegments": [],
    "nextReminderTime": "2025-10-01T09:30:00+08:00",
    "guide": {
      "name": "李导游",
      "phone": "13800001111"
    }
  }
}
```

---

### 5.8 AI 旅伴问答（出行人端）

`POST /api/ai/travel-companion`

请求：

```json
{
  "orderId": "o_123",
  "travelerId": "t_1",
  "question": "现在要去哪儿？"
}
```

响应：

```json
{
  "code": 0,
  "data": {
    "answerText": "阿姨，您现在在去颐和园的路上，大约 20 分钟就到。",
    "shouldSpeak": true
  }
}
```

前端负责使用 TTS 播报 `answerText`。

---

### 5.9 景点讲解

`GET /api/audio-guide?orderId=o_123&segmentId=s_3`

响应：

```json
{
  "code": 0,
  "data": {
    "title": "颐和园简要讲解",
    "script": "颐和园是清朝皇家园林...",
    "audioUrl": "https://cdn.laoyouxing.com/audio/seg_s3.mp3"
  }
}
```

前端优先播放 `audioUrl`，若为空则使用 `script` 做 TTS 播放。

---

### 5.10 一键求助

`POST /api/help-request`

```json
{
  "orderId": "o_123",
  "travelerName": "张妈妈",
  "locationLabel": "颐和园东门附近"
}
```

响应：

```json
{
  "code": 0,
  "data": {
    "helpRequestId": "h_123"
  }
}
```

后台客服工作台使用 `helpRequestId` 跟踪处理。

---

## 6. 前端页面开发任务清单

### 6.1 `pages/role-select/index`

- 展示两大按钮：
  - 「我是子女（帮家人订行程）」
  - 「我是出行人（自己出行/查看行程）」
- 点击按钮流程：
  1. 调用 `wx.login` 获取 code
  2. 调用 `POST /api/auth/login`（带上 role）
  3. 保存 token、lastRole
  4. `wx.reLaunch` 到对应首页

### 6.2 子女端页面

1. `pages/child/home/index`
   - 调 `GET /api/products` → 渲染列表
   - 筛选：按日期/强度
   - 点击卡片 → 跳 `product-detail`

2. `pages/child/product-detail/index`
   - `onLoad` 取 `productId` → 调 `GET /api/products/:id`
   - 展示适老标签、行程时间轴
   - 「问 AI 是否适合我爸妈」→ 弹家人档案选择 → 调 `POST /api/ai/trip-advisor` → 展示结果
   - 「立即预订」→ 跳 `order-confirm`

3. `pages/child/order-confirm/index`
   - 展示产品信息、价格、出行人
   - 提交时：
     - 调 `POST /api/orders` 获取 `orderId` + `payment`
     - 调 `wx.requestPayment`
     - 成功后 → `reLaunch` 到 `orders/index`

4. `pages/child/orders/index`
   - 调 `GET /api/orders` 按状态分组
   - 点击订单 → `order-detail`

5. `pages/child/order-detail/index`
   - `onLoad` 取 `orderId`
   - 调 `GET /api/orders/:id`
   - 调 `GET /api/trip-runtime/:orderId`
   - 展示：行程、当前状态 summaryText
   - 「发送行程给出行人」：
     - 使用 `wx.shareAppMessage` 配置路径 `/pages/traveler/home/index?orderId=...&travelerName=...`

6. `pages/child/family/index`
   - 调 `GET /api/family`
   - 展示列表 + 新建按钮

7. `pages/child/family-edit/index`
   - 创建/编辑档案 → 调 `POST/PUT /api/family`

8. `pages/child/profile/index`
   - 展示当前用户信息
   - 「切换为出行人」按钮 → 清除 `lastRole` → `reLaunch` `role-select`

### 6.3 出行人端页面

1. `pages/traveler/home/index`
   - `onLoad`：读取 `orderId` / `travelerName` 参数
   - 调 `GET /api/traveler/trip`
   - 展示：
     - 今天标题、集合时间/地点、导游电话
     - 今日时间轴（最多 4–5 个节点）
     - 「听讲解」按钮（当前节点为景点时）
     - 底部常驻红按钮「我需要帮助」
   - 「听讲解」→ 调 `GET /api/audio-guide` → 播放音频或 TTS
   - 「我需要帮助」→ 弹确认 → 调 `POST /api/help-request`

2. `pages/traveler/ai-companion/index`
   - 顶部显示对话历史
   - 底部大按钮「按住说话，问一问」
   - 将语音转文字 → 调 `POST /api/ai/travel-companion` → 展示回答 + TTS 播放

3. `pages/traveler/settings/index`
   - 字体大小设置（写入本地并影响样式）
   - 声音开关设置
   - 「切换为子女」→ 清除 `lastRole` → `reLaunch` `role-select`

---

## 7. 非功能性要求（MVP）

- 适老化体验：
  - 出行人端默认大字体，支持再放大
  - 重要信息使用高对比度颜色和图标，不仅依赖颜色区分
  - 操作步骤尽量 ≤ 3 步
- 性能：
  - 小程序首页首屏加载时间 < 3 秒（4G 网络）
  - AI 问答接口平均响应时间 < 5 秒（80% 请求）
- 安全与合规：
  - 健康与出行建议明确声明为“参考意见，不替代医生诊断”
  - 用户隐私协议与定位、通话等权限说明必须完整展示
  - 个人数据加密存储，遵守当地法律法规

---

## 8. 开发优先级建议

1. 登录 & 角色选择流
2. 子女端：线路列表 → 详情 → 下单 → 订单列表/详情
3. 子女端：家人档案 + AI 行程顾问（可先用 mock 数据）
4. 出行人端：行程首页 + 求助
5. 出行人端：AI 旅伴问答 + 讲解（可先用固定回答，再接真实大模型）

至此，老友行小程序的 MVP 开发规格说明已完整，可直接用于代码生成与实现。
