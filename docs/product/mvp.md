# OfferLoop MVP

## 1. MVP 定义

**OfferLoop MVP** 是一个面向技术求职者的 AI 求职工作台，覆盖从 JD 到 Offer 的完整闭环。

MVP 的核心不是做一个完整求职平台，而是验证：

> 用户是否愿意添加 CV、粘贴真实 JD，用 Fit Report 决定投不投、投之前做什么、CV 怎么改，并持续用 Applications 和 Follow-ups 管理每一份申请。
>

核心闭环：

```
添加 CV（含经历和项目）
↓
粘贴 JD
↓
AI 解析岗位要求
↓
选择 CV，生成 Fit Report
↓
查看 Before you apply 和 CV suggestions
↓
用户自己修改 CV
↓
保存到 Applications
↓
添加 follow-up，按时完成
↓
下一个 JD
```

---

## 2. MVP 核心目标

MVP 要验证 4 件事：

```
1. 用户是否愿意上传或粘贴真实 CV
2. 用户是否愿意用真实 JD 做分析
3. Fit Report 的 Before you apply 和 CV suggestions 是否真的被用户采纳
4. Applications 和 Follow-ups 是否能让用户持续管理求职过程
```

---

## 3. MVP 一句话价值

> From JD to Offer in one loop.
>

中文：

> 从 JD 到 Offer，一个闭环搞定。
>

---

## 4. MVP 目标用户

第一版目标用户：

```
各个阶段的技术求职者：graduate、junior、mid-level、senior
同时投递多个岗位的人
需要关注地点、远程方式或签证信息的国际求职者
```

第一版重点岗位：

```
Software Engineer
Backend Engineer
Full Stack Developer
Cloud Engineer
Platform Engineer
DevOps Engineer / SRE
Data Engineer
Data Analyst
Security Engineer
QA Engineer
```

---

## 5. MVP 页面结构

第一版包含账号页面和 6 个模块：

```
Auth           Log in / Sign up / Forgot password / Reset password
Dashboard
CV Manager
JD Analyzer
Fit Reports
Applications
Follow-ups
```

没有单独的 Projects / Evidence 页面，经历和项目都是 CV 的一部分。

每个页面都有桌面版和手机版：

```
桌面端：左侧导航，分组为 Overview / Prepare / Analyze / Track
手机端：顶部栏 + 底部 Tab：Home / CV / Analyze / Reports / Track
        Track 内切换 Applications 和 Follow-ups
```

UI 设计见 `docs/ui/`。

---

# 6. 页面与功能说明

## 6.1 Auth

页面目标：

> 让用户创建账号并保存自己的 CV、Fit Report 和申请。
>

主要功能：

```
Log in
Sign up
Forgot password：发送重置链接后显示 “Check your email”
Reset password
Log out
```

验收标准：

```
用户能注册、登录和退出
注册和重置密码时实时校验：至少 8 个字符、包含数字和大写字母
用户能通过邮件链接重置密码
不做社交登录
```

---

## 6.2 Dashboard

页面目标：

> 告诉用户现在最该做什么，并展示整体求职进展。
>

新用户：

```
Your next step：添加 CV
Complete your setup：添加 CV → 分析第一个 JD → 生成第一份 Fit Report → 保存到 Applications
空的 summary cards
```

老用户：

```
Your next step：可左右切换，可标记完成
Needs attention：逾期和即将到期的 follow-up
Summary cards：Fit Reports、Applications（按状态细分）、Interviews、Upcoming actions
Recent Fit Reports
Applications by status
```

验收标准：

```
新用户能看到上手步骤和完成进度
用户能看到当前最重要的下一步
用户能看到逾期和即将到期的 follow-up
用户能看到各状态的申请数量
用户能看到近期 Fit Report
```

---

## 6.3 CV Manager

页面目标：

> 上传、解析和管理用户 CV。CV 包含经历和项目，是所有 Fit Report 的证据来源。
>

主要功能：

```
上传 CV 文件（PDF / DOCX / TXT，最大 10MB）
粘贴 CV 文本（最多 20,000 字符）
解析 CV 内容：经历、项目、技能
保存 Base CV（默认用于新分析）
保存 Tailored CV（标注来源 Fit Report）
列表中的更多操作菜单
```

如果文件解析成本太高，第一版可以先只支持粘贴文本。

CV 数据结构：

```
CV title
CV type：Base / Tailored
Source Fit Report（Tailored CV）
CV file / text
Parsed experience
Parsed projects
Parsed skills
Education
Certifications
Updated date
```

验收标准：

```
用户能上传或粘贴 CV
系统能保存 CV 文本
系统能提取经历、项目和技能
用户能设置默认 Base CV
用户能管理多个 CV 版本
不提供 CV 详情页
```

---

## 6.4 JD Analyzer

页面目标：

> 用户粘贴 Job Description，系统解析岗位真正的要求。
>

输入：

```
JD 文本（最多 6,000 字符）
可选：Job URL
可选：Company / Role title / Location / Work mode
```

AI 需要提取：

```
Role / Company
Experience level
Location / Work mode
Required skills
Preferred skills
Top responsibilities
Seniority signals
Visa sponsorship 信息
```

验收标准：

```
用户能粘贴 JD
系统能提取必备和加分技能
系统能提取主要职责
系统能判断经验级别和 seniority 信号
系统能识别地点、工作模式和签证信息
分析结果保存为 analyzed job，并能直接创建 Fit Report
```

---

## 6.5 Fit Reports

页面目标：

> 告诉用户这个岗位值不值得投、投之前要做什么、CV 怎么改。
>

这是 MVP 的核心页面。

### 列表

```
搜索、按推荐标签筛选、排序
岗位和公司、Fit Score 和推荐标签、所用 CV、生成日期
View report
更多操作：用另一份 CV 生成 / 保存到 Applications / 下载 PDF / 分享 / 删除
```

### 创建

```
Step 1：选择 analyzed job
Step 2：选择 CV，最接近的 CV 标为 Recommended
证据只来自所选 CV
```

### 报告

```
Header：Fit Score（0-100）、推荐标签、一句话总结、Save to Applications、Download PDF
1 Before you apply（重点）：一次一条，数字和箭头翻页，Mark as done
2 CV suggestions（重点）：一次一条，数字和箭头翻页
  每条：Current text / Suggested text / Why it helps / Source in CV，Copy 和 Mark as applied
Why this result：Strong / Needs stronger evidence / Missing
Evidence match：统计数字，以及每条要求和支撑它的 CV 原文（直接展开）
```

推荐标签：

```
Apply Now
Tailor First
Low Priority
Not a Fit
```

Fit Score 考虑的因素：

```
Requirement match：JD 要求的覆盖程度
Evidence strength：CV 中证据的强弱
Gap severity：缺失的是必备还是加分技能
Seniority：岗位级别与用户经验是否相符（只计入分数，不单独展示 Role fit 区块）
Location / work mode：地点和工作模式是否可行
```

不做：

```
单独的 Role fit 区块
一键生成 tailored CV（用户根据建议自己修改 CV）
```

示例输出：

```
Fit Score: 78 / 100
Recommendation: Tailor First

Before you apply:
1. Add a Docker example from your Northwind project to your CV.
2. Make your CI/CD work visible in the experience section.

CV suggestion:
Current:   Built Python services on AWS Lambda.
Suggested: Built and deployed Python services on AWS Lambda with a GitHub Actions CI/CD pipeline.
Why:       The role requires CI/CD; your CV mentions the pipeline only in Projects.
Source:    Projects → Serverless File Processing Pipeline
```

验收标准：

```
用户能选择 analyzed job 和 CV 生成报告
系统能生成 Fit Score 和推荐标签
系统能给出 Before you apply 步骤，用户能标记完成
系统能给出基于 CV 真实内容的修改建议，并标明来源
系统能显示每条要求的匹配证据、证据不足和缺失项
用户能把报告保存到 Applications
```

---

## 6.6 Applications

页面目标：

> 管理每一份申请、它的状态和下一步。
>

状态：

```
Saved
Ready to Apply
Applied
Interview
Offer
Rejected
```

列表：

```
Summary：申请总数、进行中、面试、offer
状态筛选：All 和 6 个状态，带数量
搜索、按下一步截止日期排序
每行：岗位和公司、状态、Fit Score、投递日期、下一步（逾期标红）、Details、更多操作
```

详情：

```
Header：状态、Fit Score、所用 CV、投递日期、Update status 菜单
Next action（重点）：当前 follow-up、Mark done、Add follow-up
Application details
关联 Fit Report
Timeline
已完成事项
Notes
```

Add follow-up：

```
Related application
Action 下拉：
  Check application status
  Follow up with recruiter
  Prepare for interview
  Prepare for assessment
  Send thank-you message
  Other（选择后 Note 必填，用来描述动作）
Due date：月历选择，快捷选项 Tomorrow / In 3 days / In 1 week
Note：可选，最多 300 字符
```

字段：

```
Company
Role Title
Job URL
Location
Work Mode
Application Status
Fit Report / Fit Score / Recommendation
CV used
Applied Date
Notes
Visa Sponsorship Mentioned
```

验收标准：

```
用户能从 Fit Report 保存岗位到 Applications
用户能更新状态，状态变化写入时间线
用户能查看申请详情和关联 Fit Report
用户能添加、完成 follow-up
逾期的下一步标红
```

---

## 6.7 Follow-ups

页面目标：

> 集中展示所有申请的下一步，按截止日期排列，不错过任何 follow-up。
>

Follow-up 在申请详情里添加和编辑，这个页面用于查看和完成。

```
桌面端：左侧导航独立入口，红色角标显示逾期数量
手机端：Track Tab 中与 Applications 切换
Summary：Overdue / Due today / Rest of this week / Done this week
Open / Completed 两个 Tab
分组：Overdue / Today / This week / Later
每条：动作、岗位和公司、申请状态、截止日期、Mark done、View application
```

验收标准：

```
用户能看到所有申请的 follow-up，按截止日期分组
用户能标记完成，并在 Completed 中查看
导航上显示逾期数量
用户能跳转到对应申请
```

---

# 7. MVP 核心 AI 功能

## 7.1 JD Parsing

输入：

```
Job Description
可选的 job details
```

输出：

```
Role / company
Experience level
Required skills
Preferred skills
Responsibilities
Seniority signals
Location / work mode
Visa sponsorship 信息
```

---

## 7.2 CV Evidence Extraction

输入：

```
CV text（含经历和项目）
```

输出：

```
Detected skills
Experience evidence
Project evidence
Education evidence
Certification evidence
```

---

## 7.3 Evidence Matching

输入：

```
JD requirements
CV evidence
```

输出：

```
每条要求对应的 CV 原文
Strong / Needs stronger evidence / Missing
Evidence match 统计
```

---

## 7.4 Fit Score 与推荐

输入：

```
Evidence matching 结果
Gap severity
Seniority
Location / work mode
```

输出：

```
Fit Score（0-100）
Recommendation：Apply Now / Tailor First / Low Priority / Not a Fit
Summary
Before you apply steps
```

---

## 7.5 Evidence-Based CV Suggestions

输入：

```
JD requirements
CV text
Evidence matching 结果
```

输出：

```
Current text
Suggested text
Related JD requirement
Source in CV
Why it helps
```

规则：

```
不能编造经历
不能加入用户没有提供的技能
只能优化 CV 中已有的内容
缺失技能必须标记为 Missing
每条建议必须标明 CV 中的来源
```

---

# 8. MVP 数据对象

核心数据对象：

```
User
CV
Job（analyzed job）
JobAnalysis
FitReport
EvidenceMatch
BeforeYouApplyStep
CVSuggestion
Application
ApplicationEvent（timeline）
FollowUp
```

没有独立的 Project 对象，项目作为 CV 解析内容的一部分。

---

# 9. MVP 不做内容

第一版不做：

```
自动投递
自动爬取招聘网站
Chrome Extension
Cover Letter Generator
完整 CV Builder / 一键生成 tailored CV
单独的 Projects 模块
CV 详情页
招聘方后台
企业 HR 系统
法律 / 签证建议
薪资谈判
面试模拟
邮件提醒自动发送
社交登录
AI credits / 用量计费界面
```

特别注意：

```
Visa sponsorship 信息只做 JD 信息整理，不构成法律建议。
```

---

# 10. MVP 推荐开发顺序

## Phase 1：基础系统

```
用户注册 / 登录 / 重置密码
应用框架：桌面侧边栏 + 手机底部 Tab
数据库模型
```

## Phase 2：CV Manager

```
CV 文本粘贴和保存
文件上传和解析
Base CV / Tailored CV
```

## Phase 3：JD Analyzer

```
JD 输入
JD AI parsing
技能、职责、级别、地点和签证信息提取
```

## Phase 4：Fit Reports

```
Evidence Matching
Fit Score 和推荐标签
Before you apply
CV suggestions
```

## Phase 5：Applications 和 Follow-ups

```
保存岗位
状态管理和时间线
Add follow-up
Follow-ups 页面和逾期提醒
```

## Phase 6：Dashboard

```
新用户上手清单
Your next step / Needs attention
Summary cards 和状态统计
```

---

# 11. MVP 验收标准

MVP 至少满足：

```
用户可以注册、登录、重置密码
用户可以添加 CV（含经历和项目）
用户可以粘贴 JD
AI 可以解析 JD 技能、职责和级别
系统可以把 JD 要求匹配到 CV 原文
系统可以生成 Fit Score 和 Apply Now / Tailor First / Low Priority / Not a Fit
系统可以给出 Before you apply 步骤
系统可以给出 evidence-based CV suggestions
用户可以保存岗位到 Applications 并更新状态
用户可以添加和完成 follow-up
Dashboard 可以展示下一步和基础统计
所有页面在桌面端和手机端都可用
```

---

# 12. MVP 成功指标

产品指标：

```
用户是否添加 CV
用户是否粘贴真实 JD
用户是否查看完整 Fit Report
用户是否完成 Before you apply 步骤
用户是否采纳 CV suggestions（Mark as applied）
用户是否保存 application 并更新状态
用户是否添加并按时完成 follow-up
用户是否重复分析多个岗位
```

价值信号：

```
用户说“这个帮我判断岗位是否值得投”
用户根据建议修改了 CV
用户发现了自己的技能缺口
用户开始用 OfferLoop 管理所有投递
用户没有再错过 follow-up
用户愿意继续分析下一个岗位
```

---

# 13. 一句话总结

OfferLoop MVP 的核心是：

> 帮助技术求职者看懂 JD、判断是否值得投、知道投之前做什么、基于真实证据修改 CV，并追踪每一份申请直到拿到 offer。
>

它不是普通简历工具，而是：

```
JD analysis
+
Evidence-based Fit Report
+
Application and follow-up tracker
```

核心卖点：

> **From JD to Offer in one loop.**
>
