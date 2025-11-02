# GitHub OAuth 配置指南

## 📋 当前配置状态

✅ **已完成**: Supabase 环境变量配置
⏳ **进行中**: GitHub OAuth 配置

## 🔧 第一步：在 Supabase 仪表板中配置 GitHub OAuth

### 1. 访问 Supabase 项目
1. 打开 [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. 登录你的账户
3. 选择项目：`ljfruycnhtpnvrgxxayd` (Nano Banana)

### 2. 配置 GitHub OAuth 提供商
1. 在左侧菜单中，点击 **Authentication**
2. 点击 **Providers** 标签
3. 找到 **GitHub** 并点击它
4. **启用** GitHub 开关

### 3. 需要填入的信息
你需要提供以下信息：
- **Client ID**: GitHub OAuth 应用的客户端 ID
- **Client Secret**: GitHub OAuth 应用的客户端密钥

## 🔐 第二步：创建 GitHub OAuth 应用

### 1. 访问 GitHub 设置
1. 登录 GitHub
2. 点击右上角头像 → **Settings**
3. 在左侧菜单中，找到 **Developer settings**
4. 点击 **OAuth Apps**
5. 点击 **New OAuth App**

### 2. 填写应用信息
```
Application name: Nano Banana AI
Homepage URL: http://localhost:3000
Authorization callback URL: https://ljfruycnhtpnvrgxxayd.supabase.co/auth/v1/callback
```

### 3. 获取凭证
1. 点击 **Register application**
2. 复制 **Client ID**
3. 点击 **Generate a new client secret**
4. 复制 **Client Secret** (只显示一次，务必保存)

## ⚙️ 第三步：完成配置

### 1. 更新 Supabase 配置
在 Supabase 仪表板的 GitHub OAuth 设置中填入：
- **Client ID**: [从 GitHub OAuth 应用复制的 ID]
- **Client Secret**: [从 GitHub OAuth 应用复制的 Secret]

### 2. 更新环境变量
编辑 `.env.local` 文件，添加 GitHub 配置：

```env
# GitHub OAuth Configuration
GITHUB_CLIENT_ID=你的_github_client_id
GITHUB_CLIENT_SECRET=你的_github_client_secret
```

### 3. 重启开发服务器
```bash
pnpm dev
```

## 🧪 第四步：测试登录功能

1. 打开 [http://localhost:3000](http://localhost:3000)
2. 点击 **"Sign in with GitHub"** 或 **"Start Editing"**
3. 应该会跳转到 GitHub 授权页面
4. 授权后会跳转回你的应用
5. 用户头像应该显示在页面右上角

## 🔍 重要说明

### 回调 URL
- **GitHub OAuth 应用**: `https://ljfruycnhtpnvrgxxayd.supabase.co/auth/v1/callback`
- **本地开发**: `http://localhost:3000`
- **生产环境**: `https://your-domain.com`

### 安全注意事项
1. 不要在客户端代码中暴露 `Client Secret`
2. 确保 GitHub OAuth 应用的回调 URL 正确
3. 在生产环境中使用 HTTPS

## 🛠️ 故障排除

### 常见错误及解决方案：

1. **"Invalid redirect_uri"**
   - 检查 GitHub OAuth 应用中的回调 URL 是否完全匹配
   - 确保使用的是 Supabase 的回调 URL，不是你的应用 URL

2. **"Missing environment variables"**
   - 检查 `.env.local` 文件是否存在
   - 重启开发服务器

3. **"400 bad request"**
   - 确认 GitHub OAuth 应用已启用
   - 检查 Client ID 和 Secret 是否正确

### 调试模式
如需启用调试，可以在浏览器控制台查看网络请求和错误信息。

## 📱 移动端和桌面应用

如果将来需要移动端或桌面应用，GitHub OAuth 应用配置需要：
- 添加更多回调 URL
- 配置相应的授权范围

## 🎯 下一步

配置完成后，你可以：
- 测试完整的登录/登出流程
- 访问用户信息
- 实现基于用户身份的功能
- 设置行级安全策略 (RLS)

---

## 📞 需要帮助？

如果在配置过程中遇到问题：
1. 检查控制台错误信息
2. 确认所有 URL 配置正确
3. 确认 Supabase 和 GitHub 配置一致
4. 重新启动开发服务器

祝你配置顺利！🚀