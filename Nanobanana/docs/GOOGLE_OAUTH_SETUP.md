# Google OAuth 配置指南

## 📋 概述

本指南将帮助你为 Nano Banana 项目配置 Google OAuth 认证，使用 Supabase 作为认证后端。

## 🔧 第一步：创建 Google OAuth 应用

### 1. 访问 Google Cloud Console
1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 登录你的 Google 账户
3. 创建新项目或选择现有项目

### 2. 启用 Google+ API
1. 在左侧菜单中，找到 **APIs & Services** → **Library**
2. 搜索 "Google+ API" 或 "People API"
3. 点击 **Enable** 启用该 API

### 3. 创建 OAuth 2.0 凭据
1. 进入 **APIs & Services** → **Credentials**
2. 点击 **Create Credentials** → **OAuth 2.0 Client IDs**
3. 如果需要，先配置 **OAuth consent screen**：
   - 选择 **External** 用户类型
   - 填写应用名称：`Nano Banana AI`
   - 填写用户支持邮箱
   - 添加开发者联系信息
4. 选择 **Web application** 作为应用类型
5. 填写应用信息：
   ```
   Name: Nano Banana AI Web Client
   Authorized JavaScript origins: http://localhost:3001
   Authorized redirect URIs: https://ljfruycnhtpnvrgxxayd.supabase.co/auth/v1/callback
   ```
6. 点击 **Create** 创建凭证

### 4. 获取凭证
创建完成后，你将获得：
- **Client ID**：类似 `123456789-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com`
- **Client Secret**：类似 `GOCSPX-abcdefghijklmnopqrstuvwxyz`

## 🔐 第二步：在 Supabase 中配置 Google OAuth

### 1. 访问 Supabase 项目
1. 打开 [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. 选择你的项目：`ljfruycnhtpnvrgxxayd`

### 2. 配置 Google OAuth 提供商
1. 在左侧菜单中，点击 **Authentication**
2. 点击 **Providers** 标签
3. 找到 **Google** 并点击它
4. **启用** Google 开关

### 3. 填入 Google 凭证
- **Client ID**: 粘贴从 Google Cloud Console 获取的 Client ID
- **Client Secret**: 粘贴从 Google Cloud Console 获取的 Client Secret
- 点击 **Save** 保存配置

## ⚙️ 第三步：更新环境变量

编辑 `.env.local` 文件，添加 Google OAuth 配置：

```env
# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 示例配置：
```env
# Google OAuth Configuration
GOOGLE_CLIENT_ID=123456789-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abcdefghijklmnopqrstuvwxyz
```

## 🔄 第四步：重启开发服务器

更新环境变量后，重启开发服务器以应用更改：

```bash
# 如果服务器正在运行，先停止它 (Ctrl+C)
# 然后重新启动
pnpm dev
```

## 🧪 第五步：测试 Google 登录

### 1. 访问应用
打开浏览器访问：http://localhost:3001

### 2. 测试登录流程
1. 点击右上角的 **"Sign In"** 按钮
2. 选择 **"Continue with Google"**
3. 应该会跳转到 Google 授权页面
4. 选择你的 Google 账户并授权
5. 授权后会跳转回你的应用
6. 用户头像应该显示在页面右上角

### 3. 验证功能
- ✅ Google 登录按钮正常工作
- ✅ 用户信息正确显示
- ✅ 登出功能正常
- ✅ 会话持久化

## 🎨 功能特性

### 登录选项
- **GitHub 登录**: 使用 GitHub 账户登录
- **Google 登录**: 使用 Google 账户登录
- **下拉菜单**: 统一的登录界面选择

### 安全特性
- **服务器端认证**: 安全的会话管理
- **OAuth 2.0**: 标准的 OAuth 2.0 流程
- **令牌刷新**: 自动刷新访问令牌
- **CSRF 保护**: 防止跨站请求伪造

## 🔍 重要说明

### 回调 URL 配置
- **Google OAuth 应用**：`https://ljfruycnhtpnvrgxxayd.supabase.co/auth/v1/callback`
- **Supabase 项目**：与 Google OAuth 应用中的回调 URL 一致
- **本地开发**：使用 localhost:3001 作为 JavaScript 源

### API 权限
确保你的 Google OAuth 应用具有以下权限：
- **Google+ API** (或 People API)：访问用户基本信息
- **Email**：获取用户邮箱地址
- **Profile**：获取用户个人资料

## 🛠️ 故障排除

### 常见错误及解决方案：

1. **"redirect_uri_mismatch"**
   - 检查 Google OAuth 应用中的回调 URL 是否完全匹配
   - 确保 Supabase 项目中的回调 URL 配置正确

2. **"invalid_client"**
   - 验证 Client ID 是否正确
   - 检查 Client Secret 是否正确

3. **"access_denied"**
   - 用户拒绝了授权请求
   - 检查 OAuth 应用权限范围

4. **Google 登录按钮不工作**
   - 检查环境变量是否正确设置
   - 重启开发服务器
   - 检查浏览器控制台错误信息

### 调试技巧
1. 打开浏览器开发者工具
2. 检查 Network 标签页的请求和响应
3. 查看 Console 标签页的错误信息
4. 验证环境变量是否正确加载

## 📱 生产环境配置

对于生产环境，需要：

1. **更新回调 URL**：
   ```
   Production: https://your-domain.com/auth/v1/callback
   ```

2. **添加域名到 Google OAuth 应用**：
   - 在 Google Cloud Console 中添加你的生产域名
   - 更新授权的 JavaScript 源

3. **HTTPS 要求**：
   - 生产环境必须使用 HTTPS
   - 确保所有 URL 都是 HTTPS 协议

## 🔧 高级配置

### 自定义权限范围
可以在 `AuthContext` 中添加自定义权限范围：

```typescript
const loginWithGoogle = async (redirectTo?: string) => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/api/auth/google${redirectTo ? `?next=${encodeURIComponent(redirectTo)}` : ''}`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
        scope: 'openid email profile https://www.googleapis.com/auth/userinfo.email'
      },
    },
  })
}
```

### 品牌定制
可以自定义 Google 登录按钮的外观和文本：

```jsx
<GoogleLoginButton
  variant="outline"
  size="lg"
  className="custom-google-button"
>
  使用 Google 账号登录
</GoogleLoginButton>
```

## 📞 需要帮助？

如果在配置过程中遇到问题：
1. 检查 Google Cloud Console 配置
2. 验证 Supabase 项目设置
3. 确认环境变量正确
4. 查看浏览器控制台错误信息
5. 重启开发服务器

祝你配置顺利！🚀