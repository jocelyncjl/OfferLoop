# OfferLoop 技术方案

## 这份文档是什么

这份文档确定 OfferLoop **用什么技术做、各部分怎么连起来、上线后跑在哪里**。

- 产品范围：`docs/product/mvp.md`
- 数据结构：`docs/architecture/data-model.md`
- 用户流程：`docs/user-flows/README.md`

---

## 一、整体结构

```text
浏览器（桌面 / 手机）
   │  https://offerloop 域名
   ▼
Caddy（HTTPS 和转发）
   ├─ 页面请求 ───────────▶ 前端 web（Next.js）
   └─ /v1/* 接口请求 ─────▶ 后端 api（Go）
                              ├─ PostgreSQL（数据库）
                              ├─ 文件存储（CV 原文件）
                              ├─ 后台任务（AI 分析、文件解析）
                              ├─ AI 服务商
                              └─ 邮件服务（重置密码）
```

前端和后端用**同一个域名**：页面请求交给前端，`/v1/` 开头的接口请求交给后端。这样浏览器不会遇到跨域问题，登录 cookie 也能直接使用。

---

## 二、前端 `web/`

| 项目 | 选择 | 状态 |
| --- | --- | --- |
| 框架 | Next.js 16（App Router）+ React 19 | 已有 |
| 语言 | TypeScript | 已有 |
| 样式 | Tailwind CSS 4 | 已有 |
| 图标 | lucide-react | 已有 |
| 字体 | Inter（与设计稿一致） | 待改 |
| 包管理 | pnpm | 已有 |

### 页面路由

| 页面 | 路由 |
| --- | --- |
| 首页 | `/` |
| 登录 / 注册 | `/login`、`/register` |
| 忘记 / 重置密码 | `/forgot-password`、`/reset-password?token=…` |
| Dashboard | `/dashboard` |
| CV Manager | `/cv` |
| JD Analyzer | `/jd-analyzer`、`/jd-analyzer/[jobId]` |
| Fit Reports | `/fit-reports`、`/fit-reports/new`、`/fit-reports/[id]` |
| Fit Report 打印版（下载 PDF 用） | `/fit-reports/[id]/print` |
| Applications | `/applications`、`/applications/[id]` |
| Follow-ups | `/follow-ups` |

现有的 `/projects` 和 `/profile` 页面删除：项目已经并入 CV，账号页暂不做。

### 布局

- **桌面端**（宽度 ≥ 1024px）：左侧导航栏，见设计稿。
- **手机端**（宽度 < 1024px）：顶部栏 + 底部 5 个 Tab：Home、CV、Analyze、Reports、Track。
- 登录后的页面共用一个布局组件；首页和账号页各自使用独立布局。

### 调用后端

- 所有接口都用相对路径 `/v1/...`。本地开发时，由 Next.js 的 `rewrites` 转发到 `http://localhost:8025`。
- 登录状态由浏览器 cookie 自动带上，前端代码不接触 token。
- Next.js 的 `middleware` 检查有没有登录 cookie：没有就跳转到 `/login`。真正的权限校验在后端做。

---

## 三、后端 `api/`

后端基于现有的 ZGO 脚手架（Go 项目模板）。

| 项目 | 选择 | 状态 |
| --- | --- | --- |
| 语言 | Go 1.24 | 已有 |
| Web 框架 | Gin | 已有 |
| 数据库访问 | GORM | 已有 |
| 数据库迁移 | gormigrate（`api/database/migrations`） | 已有 |
| 依赖注入 | Wire | 已有 |
| 接口文档 | Swagger（`/swagger/index.html`） | 已有 |
| 登录 | JWT | 已有，需改造（见第五节） |
| 后台任务 | 脚手架自带队列 | 已有 |
| AI | 脚手架自带 AI 模块（`internal/capabilities/ai`） | 已有，需扩展 |
| 邮件 | 脚手架自带通知模块 | 已有，需接入邮件服务 |

### 业务模块

在 `api/internal/modules/` 下新增 4 个模块，和数据表一一对应：

| 模块 | 负责的表 | 主要功能 |
| --- | --- | --- |
| `user`（已有，改造） | `users`、`password_reset_tokens` | 注册、登录、退出、重置密码 |
| `cv` | `cvs` | 上传、粘贴、解析、列表、设为默认、删除 |
| `job` | `jobs`、`job_analyses` | 保存 JD、AI 分析 |
| `fitreport` | `fit_reports`、`evidence_matches`、`before_you_apply_steps`、`cv_suggestions` | 生成报告、标记完成或已采纳 |
| `application` | `applications`、`application_events`、`follow_ups` | 申请、状态、时间线、follow-up |

Dashboard 不单独建模块，由一个汇总接口从上面这些表统计数据。

脚手架自带的 `apikey`、`audit`、`permission` 模块，MVP 不对外使用。

---

## 四、数据库

| 项目 | 选择 |
| --- | --- |
| 数据库 | PostgreSQL 16 |
| 列表类数据（技能列表、解析后的 CV） | 存为 JSONB |
| 时间 | 一律存 UTC（`timestamptz`）；`due_date` 只存日期（`date`） |
| 用户时区 | 在 `users` 表加 `timezone` 字段，注册和登录时从浏览器读取；"今天"和"逾期"按这个时区计算 |
| 表结构变更 | 只通过迁移文件修改，不手动改数据库 |

本地开发用 Docker 启动 PostgreSQL。

---

## 五、账号和登录

**以设计为准**改造现有的 `user` 模块：

| | 改造后 |
| --- | --- |
| 注册字段 | `full_name`、`email`、`password`（不再要求 username） |
| 登录方式 | 邮箱 + 密码 |
| 密码规则 | 至少 8 个字符，包含数字和大写字母，最多 72 字节（bcrypt 的上限） |
| 密码存储 | bcrypt 加密 |
| 登录状态 | 登录成功后，后端把 JWT 写进 cookie：`HttpOnly`、`Secure`、`SameSite=Lax`，有效期 7 天 |
| 退出 | 后端清除 cookie |
| 重置密码 | 链接有效期 30 分钟（现有逻辑），只能使用一次；无论邮箱是否注册都返回成功 |
| 防暴力尝试 | 登录、注册、忘记密码接口按 IP 和邮箱限制频率 |

为什么用 cookie：token 放在 `HttpOnly` cookie 里，页面上的 JavaScript 读不到，比存在浏览器本地存储里更安全，前端也不用自己管理 token。

---

## 六、CV 文件

### 上传和存储

| 项目 | 选择 |
| --- | --- |
| 格式和大小 | PDF、DOCX、TXT，最大 10MB；按文件内容判断格式，不只看扩展名 |
| 存储位置 | 统一的"文件存储"接口：本地开发存在 `api/storage/`，线上存在 S3 兼容的对象存储 |
| 文件名 | 存储时使用随机生成的 key，不使用用户上传时的原文件名 |
| 访问 | 文件不公开，只能通过后端接口读取，并且检查是否属于当前用户 |

### 提取文字

| 格式 | 方式 |
| --- | --- |
| PDF | 用 `pdftotext`（poppler 工具，装在后端的 Docker 镜像里） |
| DOCX | Go 代码解压后读取其中的文字 |
| TXT | 直接读取 |

- 扫描版 PDF（图片里的文字）不做识别，提示用户改用粘贴文本。
- 提取出的文字超过 20,000 字符时，提示用户精简。

文字提取出来后，交给 AI 解析出经历、项目和技能（见第七节）。

---

## 七、AI

### 三次 AI 调用

| 调用 | 什么时候 | 输入 | 输出 |
| --- | --- | --- | --- |
| CV 解析 | 保存 CV 后 | CV 全文 | 经历、项目、技能、教育、证书 |
| JD 分析 | 点击 Analyze JD | JD 全文和可选的岗位信息 | 级别、技能、职责、地点、签证信息 |
| Fit Report | 点击生成 | JD 分析结果和 CV 全文 | 分数、推荐、证据匹配、投递前步骤、CV 建议 |

### 怎么调用

- **后台执行**：AI 调用可能要几十秒，不在网页请求里等。流程如下：
  1. 接口先创建一条记录，状态为 `pending`，立即返回。
  2. 后台任务调用 AI，完成后把状态改为 `completed`；失败则改为 `failed`。
  3. 前端每 2 秒查询一次状态，完成后显示结果。
- **结构化输出**：要求 AI 返回固定格式的 JSON。后端按格式校验，不合格就重试 1 次，仍然失败则标记为 `failed`，页面显示"重试"。
- **服务商**：沿用现有 AI 模块，通过配置切换服务商（目前已实现 OpenAI）。具体用哪个模型、提示词怎么写、分数怎么算，在单独的《AI 输出规格》中确定。
- **记录版本**：每次结果都记下所用的模型和提示词版本，方便以后对比和排查。
- **成本保护**：每个用户每天的 AI 调用次数设上限，不对用户显示额度。

---

## 八、报告下载 PDF

- 点击 Download PDF 时，打开 `/fit-reports/[id]/print`。
- 这个页面用专门的打印样式排版，然后调用浏览器的"打印 / 另存为 PDF"。
- 不在服务器上生成 PDF，也不保存 PDF 文件。

---

## 九、邮件

- 只用于发送重置密码邮件。
- 本地开发时不真正发送，把邮件内容打印到后端日志里。
- 线上通过 SMTP 接入一个事务邮件服务，例如 Resend、Postmark 或 Amazon SES。
- 发件域名需要配置 SPF 和 DKIM，避免邮件进垃圾箱。

---

## 十、部署

### 环境

| 环境 | 用途 |
| --- | --- |
| 本地 | 开发，Docker 启动数据库 |
| 线上 | 正式使用 |

MVP 阶段先不设测试环境，需要时再加。

### 线上方式

一台云服务器，用 Docker Compose 运行 4 个容器：

```text
caddy     自动申请 HTTPS 证书，转发请求
web       Next.js（standalone 模式构建）
api       Go 后端（包含后台任务）
postgres  数据库，数据目录挂载到服务器磁盘，每天自动备份
```

CV 文件放在对象存储，不放在这台服务器上。

### 代码检查和发布

GitHub Actions 放在仓库根目录 `.github/workflows/`：

- **每次提交**：
  - 后端：`go test`、`go vet`
  - 前端：`pnpm lint`、类型检查、`pnpm build`
- **合并到 main**：构建镜像，部署到服务器。

### 需要清理的脚手架遗留

- `api/deploy/`：是 ZGO 脚手架作者自己的部署配置，指向别人的服务器，不能使用，需要删除，换成 OfferLoop 自己的配置。
- `api/.github/`：放在子目录里，GitHub 不会执行，删除。
- `api/docker-compose.yml`：里面的 `gradfit_*` 名称改为 `offerloop_*`。

---

## 十一、安全和隐私

| 方面 | 做法 |
| --- | --- |
| 传输 | 全站 HTTPS |
| 数据隔离 | 每个接口都检查数据是否属于当前登录用户 |
| 日志 | 不记录 CV 全文、JD 全文、密码和 token |
| AI 服务商 | 只发送完成任务所需的文字；使用 API 方式调用（默认不用于训练模型） |
| 删除账号 | 删除该用户的所有数据和 CV 文件 |
| 密钥 | JWT 密钥、数据库密码、AI 和邮件的密钥都放在环境变量中，不提交到代码仓库 |

---

## 十二、测试

| 范围 | 方式 |
| --- | --- |
| 后端业务逻辑 | Go 单元测试 |
| 后端接口流程 | 脚手架自带的 kest 流程测试（`api/tests/kest/`） |
| AI 输出 | 用几份固定的 CV 和 JD 样例检查输出格式，不检查具体措辞 |
| 前端 | lint 和类型检查；核心流程（注册 → 分析 → 报告 → 申请）后续补 Playwright 端到端测试 |

---

## 十三、开发顺序

和 `docs/product/mvp.md` 第 10 节一致：

1. 基础：清理脚手架遗留、改造账号、搭建应用框架（侧边栏 + 底部 Tab）、配置本地环境
2. CV Manager
3. JD Analyzer
4. Fit Reports
5. Applications 和 Follow-ups
6. Dashboard
7. 部署上线
