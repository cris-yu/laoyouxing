# 老友行小程序 - MVP版本

## 项目概述

老友行是一款专为中老年人及其子女设计的旅行小程序，提供适老化的旅行服务和AI智能陪伴功能。

### 核心功能

**子女端：**
- 浏览和筛选适老化旅行线路
- AI行程顾问评估线路适配度
- 为父母预订行程
- 实时查看父母出行状态
- 管理家人健康档案

**出行人端（父母）：**
- 查看当日行程安排
- AI旅伴语音问答
- 景点讲解播放
- 一键求助功能
- 大字体、高对比度适老化设计

## 技术栈

- 微信小程序原生框架
- TypeScript
- RESTful API

## 项目结构

```
laoyouxing/
├── app.json                 # 小程序配置
├── app.ts                   # 小程序入口
├── app.wxss                 # 全局样式
├── package.json             # 项目依赖
├── tsconfig.json            # TypeScript配置
├── project.config.json      # 项目配置
├── sitemap.json             # 站点地图
│
├── types/                   # TypeScript类型定义
│   └── index.ts
│
├── constants/               # 常量配置
│   └── index.ts
│
├── utils/                   # 工具函数
│   ├── api.ts              # API接口
│   ├── request.ts          # 请求封装
│   ├── storage.ts          # 存储工具
│   └── common.ts           # 通用工具
│
├── pages/                   # 页面
│   ├── role-select/        # 角色选择页
│   │
│   ├── child/              # 子女端
│   │   ├── home/           # 线路列表
│   │   ├── product-detail/ # 线路详情
│   │   ├── order-confirm/  # 订单确认
│   │   ├── orders/         # 订单列表
│   │   ├── order-detail/   # 订单详情
│   │   ├── family/         # 家人档案列表
│   │   ├── family-edit/    # 家人档案编辑
│   │   └── profile/        # 个人中心
│   │
│   └── traveler/           # 出行人端
│       ├── home/           # 行程首页
│       ├── ai-companion/   # AI旅伴
│       └── settings/       # 设置
│
└── assets/                  # 静态资源
    ├── images/
    └── icons/
```

## 快速开始

### 1. 环境准备

- 安装[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
- Node.js 14+

### 2. 安装依赖

```bash
npm install
```

### 3. 配置

1. 在 `project.config.json` 中配置您的小程序 AppID
2. 在 `constants/index.ts` 中配置后端 API 地址

### 4. 运行

使用微信开发者工具打开项目目录即可预览和调试。

## API接口说明

所有API接口遵循统一的响应格式：

```typescript
{
  code: number;      // 0=成功，其它=错误
  message: string;   // 提示信息
  data?: any;        // 返回数据
}
```

### 主要接口

- **认证**: `POST /api/auth/login`, `GET /api/auth/me`
- **线路**: `GET /api/products`, `GET /api/products/:id`
- **家人档案**: `GET /api/family`, `POST /api/family`
- **订单**: `POST /api/orders`, `GET /api/orders/:id`
- **AI**: `POST /api/ai/trip-advisor`, `POST /api/ai/travel-companion`
- **求助**: `POST /api/help-request`

详细接口文档请参考开发规格说明文档。

## 功能特性

### 适老化设计

1. **大字体支持**: 提供标准、大、超大三种字体选项
2. **高对比度**: 重要信息使用高对比度颜色
3. **简化交互**: 操作步骤不超过3步
4. **语音交互**: 支持语音输入和播报

### 智能功能

1. **AI行程顾问**: 基于家人健康档案评估线路适配度
2. **AI旅伴问答**: 实时回答出行相关问题
3. **智能提醒**: 行程节点自动提醒

### 安全保障

1. **一键求助**: 紧急情况快速联系客服
2. **实时位置**: 子女可查看父母行程状态
3. **健康档案**: 记录健康状况便于应急处理

## 开发规范

### 代码风格

- 使用TypeScript进行类型约束
- 遵循ESLint规则
- 函数和变量命名使用驼峰命名法
- 添加必要的注释

### 组件开发

- 优先使用小程序原生组件
- 复用公共组件和工具函数
- 保持组件职责单一

### 性能优化

- 图片使用压缩和懒加载
- 列表使用虚拟滚动
- 接口请求添加loading状态
- 合理使用缓存

## 注意事项

1. **微信支付**: 实际支付功能需要接入微信支付SDK并配置商户号
2. **API地址**: 开发时需要将`constants/index.ts`中的API地址改为实际后端地址
3. **权限申请**: 使用定位、录音等功能需要在`app.json`中声明权限
4. **真机调试**: 部分功能(如支付、分享)需要在真机环境测试

## 后续优化方向

1. 增加更多适老化功能(如语音唤醒、智能客服)
2. 完善订单和支付流程
3. 添加更多旅行服务(如保险、接送机)
4. 优化AI问答准确度和响应速度
5. 增加数据统计和分析功能

## 许可证

MIT License

## 联系方式

如有问题或建议，请联系开发团队。
