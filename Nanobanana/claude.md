# Nano Banana - AI图像编辑工具

## 项目概述

Nano Banana是一个基于AI的图像编辑平台，使用自然语言处理技术实现图像变换和编辑。这是一个现代化的Next.js应用，为用户提供直观的AI驱动图像编辑体验。

## 核心功能

- **AI图像编辑**: 通过简单的文本提示变换任何图像
- **角色一致性编辑**: 保持角色特征的一致性修改
- **场景保持**: 在编辑过程中保持场景完整性
- **自然语言处理**: 用户友好的文本描述交互
- **实时预览**: 上传图片后即时预览编辑效果
- **GitHub身份认证**: 使用GitHub账户安全登录和管理用户会话

## 技术栈

### 核心框架
- **Next.js 16.0.0**: 全栈React框架，支持App Router
- **React 19.2.0**: 最新版本React，支持最新特性
- **TypeScript**: 类型安全保障

### UI/UX
- **Tailwind CSS v4**: 现代化CSS框架
- **shadcn/ui**: 基于Radix UI的组件库
- **Lucide React**: 图标库
- **next-themes**: 主题切换支持

### 开发工具
- **pnpm**: 包管理器
- **PostCSS**: CSS处理
- **ESLint**: 代码质量检查
- **Vercel Analytics**: 网站分析

### 身份认证
- **Supabase Auth**: 现代化身份认证解决方案
- **GitHub OAuth**: GitHub账户登录集成
- **服务器端认证**: 安全的会话管理和令牌处理

## 项目结构

```
Nanobanana/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 主页
├── components/            # React组件
│   ├── ui/               # shadcn/ui基础组件
│   ├── header.tsx        # 头部导航（集成认证）
│   ├── hero.tsx          # 主要英雄区域
│   ├── case-examples.tsx # 案例展示
│   ├── testimonials.tsx  # 用户评价
│   ├── faq.tsx          # 常见问题
│   ├── footer.tsx       # 页脚
│   ├── image-upload-area.tsx # 图片上传
│   ├── github-login-button.tsx # GitHub登录按钮
│   ├── user-profile.tsx  # 用户资料组件
│   └── theme-provider.tsx # 主题提供者
├── hooks/               # 自定义Hooks
│   ├── use-mobile.ts    # 移动端检测
│   └── use-toast.ts    # Toast通知
├── contexts/            # React Context
│   └── auth-context.tsx # 认证状态管理
├── lib/                 # 工具函数
│   ├── utils.ts        # 通用工具
│   ├── supabase.ts     # 客户端Supabase配置
│   └── supabase-server.ts # 服务器端Supabase配置
├── styles/              # 样式文件
│   └── globals.css     # 全局样式
├── public/              # 静态资源
└── 配置文件...
```

## 主要组件

### 1. 主页 (app/page.tsx)
- 客户端渲染的营销页面
- 状态管理：上传的图片列表
- 集成所有主要组件

### 2. 英雄区域 (components/hero.tsx)
- **核心价值主张**: "The AI model that outperforms Flux Context"
- **主要功能**: Transform any image with simple text prompts
- **特色卖点**:
  - One-shot editing
  - Multi-image support
  - Natural language processing
- **交互功能**: 图片上传、文本编辑、实时预览

### 3. 案例展示 (components/case-examples.tsx)
四大应用场景：
- **Character Transformation**: 人物服装、发型变换
- **Scene Editing**: 场景编辑，保持主体完整
- **Style Transfer**: 艺术风格转换
- **Object Manipulation**: 物体操作、添加/删除

### 4. 用户评价 (components/testimonials.tsx)
专业用户背书：
- Creative Director
- Photographer
- Content Creator
- Art Director

### 5. 常见问题 (components/faq.tsx)
解答用户疑虑：
- 产品定义和工作原理
- 支持格式和数据隐私
- 商业使用和定价策略

### 6. 认证系统
基于Supabase的现代化身份认证解决方案：
- **GitHub OAuth集成**: 一键GitHub账户登录
- **服务器端认证**: 安全的会话管理和令牌处理
- **用户状态管理**: 全局认证状态和用户信息
- **受保护路由**: 中间件保护的API和页面
- **用户体验**: 优雅的登录/注销流程

#### 认证组件
- `GitHubLoginButton`: 可定制的GitHub登录按钮
- `UserProfile`: 用户资料下拉菜单
- `AuthProvider`: 全局认证状态上下文
- 认证API路由：`/api/auth/*` 处理登录流程

## 开发指南

### 启动项目
```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建项目
pnpm build

# 启动生产服务器
pnpm start

# 代码检查
pnpm lint
```

### 主要特性

#### 响应式设计
- 移动端优先设计
- 自适应布局
- 触摸友好的交互

#### 主题系统
- 支持明暗主题切换
- CSS变量驱动的主题
- 平滑的过渡动画

#### 组件化架构
- 可复用的UI组件
- 类型安全的Props
- 一致的设计语言

#### 用户体验
- 拖拽上传图片
- 实时状态反馈
- Toast通知系统
- 流畅的动画效果

## 部署

项目配置为在Vercel上无缝部署：

1. 连接GitHub仓库到Vercel
2. 自动构建和部署
3. 内置分析和性能监控

## 未来开发方向

### 即将实现的功能
- [ ] AI模型集成
- [ ] 实时图像处理
- [ ] 用户账户系统
- [ ] 批量处理功能
- [ ] 高级编辑工具

### 性能优化
- [ ] 图像懒加载
- [ ] 代码分割
- [ ] 缓存策略
- [ ] CDN优化

### 扩展功能
- [ ] API接口开发
- [ ] 移动端应用
- [ ] 插件系统
- [ ] 协作功能

## 贡献指南

1. Fork项目仓库
2. 创建功能分支
3. 提交代码变更
4. 创建Pull Request
5. 代码审查和合并

## 许可证

本项目采用MIT许可证，详见LICENSE文件。

---

*Nano Banana - 让AI图像编辑变得简单而强大* 🍌