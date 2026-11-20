# OfferLoop 产品需求文件

## 1. 产品名称

**OfferLoop**

名称含义：

```
Offer = 求职的终点：拿到 offer
Loop  = 从 JD 到 offer 的完整闭环：分析 → 定制 → 投递 → 跟进 → 下一轮
```

Slogan：

> **From JD to Offer in one loop.**
>

副标题：

> Analyze job descriptions, tailor your CV, track every application and never miss a follow-up.
>

---

## 2. 产品一句话定位

**OfferLoop is an AI job search workspace for tech job seekers: analyze job descriptions, tailor your CV with real evidence, track every application and never miss a follow-up.**

中文定位：

> OfferLoop 是一个面向技术求职者的 AI 求职工作台：分析 JD、基于真实经历定制 CV、追踪每一份申请，并且不错过任何一次 follow-up。
>

---

## 3. 产品核心理念

OfferLoop 不只是帮用户管理投递记录，也不只是给简历打一个匹配分。

它要解决的是：

> 求职者不知道哪些岗位值得投、投之前该做什么、CV 该怎么改，投出去以后又容易忘记下一步。
>

所以产品围绕一个闭环设计：

```
Add a JD → Analyze → Tailor → Track and follow up → Offer
```

对应的产品目标：

```
帮助用户看懂 JD 真正要求什么
帮助用户判断岗位是否值得投
帮助用户知道投递前要做哪些事
帮助用户基于真实证据修改 CV
帮助用户追踪每一份申请和它的下一步
帮助用户按时完成每一个 follow-up
```

---

## 4. 核心卖点

主卖点：

> **From JD to Offer in one loop.**
>

中文：

> 从 JD 到 Offer，一个闭环搞定。
>

辅助卖点：

```
Not just a match score — clear next steps before you apply.
不只是匹配分，而是投递前明确该做什么。

No fake experience — only evidence-based CV suggestions.
不编造经历，只基于 CV 中的真实证据给建议。

Never miss a follow-up.
每一份申请的下一步都有日期、有提醒。
```

---

## 5. 产品背景与灵感来源

这个产品最初来自在爱尔兰求职的国际技术毕业生的真实经历（早期名称 GradFit Ireland）。后来发现这些问题并不局限于某个国家或某个阶段，所有技术求职者都会遇到：

```
不知道 JD 中哪些技能是核心要求
不知道自己的 CV 是否真的匹配岗位
不知道项目经历能不能证明岗位要求
不知道哪些只是 CV 表达不明显，哪些是真正的技能缺口
不知道投递前应该先补什么、改什么
不知道如何针对不同岗位调整 CV
投递很多岗位后管理混乱
忘记 follow-up，或不清楚下一步该做什么
```

现有工具通常只解决其中一段：

```
简历润色
ATS 关键词匹配
投递记录管理
Cover letter 生成
```

但它们没有把整个过程串起来：

```
这个岗位对我是否值得投？
投之前我应该先做什么？
我的 CV 哪一行能证明这个要求？
投出去以后，下一步是什么、什么时候做？
```

OfferLoop 把这些环节放进同一个闭环。

---

## 6. 目标用户

### 6.1 核心用户

```
各个阶段的技术求职者：graduate、junior、mid-level、senior
Software / Backend / Full Stack / Cloud / DevOps / SRE / Data / Security 等技术岗位
同时投递多个岗位、需要系统管理求职过程的人
```

产品不限定国家或地区。岗位地点、远程方式和签证 / sponsorship 信息作为 JD 分析结果的一部分展示。

---

### 6.2 典型用户画像

用户画像 1：

```
身份：应届或毕业 0-2 年的技术求职者
目标岗位：Graduate Software Engineer / Junior Cloud Engineer
痛点：不知道 CV 和岗位是否匹配，不知道项目应该怎么写进简历
```

用户画像 2：

```
身份：有几年经验的后端 / 数据工程师
目标岗位：Backend Engineer / Data Engineer，跨城市或远程
痛点：同时投很多岗位，缺少系统管理，经常错过 follow-up
```

用户画像 3：

```
身份：需要关注工作授权的国际求职者
目标：找到现实可投的技术岗位
痛点：很多岗位看起来不错，但不确定是否值得投、是否提供 sponsorship
```

---

## 7. 为什么先聚焦技术岗位

技术岗位的 JD 通常包含明确、可结构化的技能要求：

```
AWS / Azure / GCP
Docker / Kubernetes / Terraform
CI/CD
Python / Java / Go / TypeScript
SQL / Data pipelines
Linux / Networking / Security
```

这适合做：

```
技能提取
证据匹配
技能缺口分析
Fit Score 与投递建议
基于证据的 CV 建议
```

---

## 8. 核心问题定义

OfferLoop 要解决 5 个核心问题。

### 问题 1：这个 JD 到底要求什么

用户需要快速看清：

```
必备技能和加分技能
主要职责
经验年限和级别信号
地点、工作模式、签证 / sponsorship 信息
```

---

### 问题 2：这个岗位值不值得投

用户需要一个明确的结论，而不只是一个分数：

```
Apply Now / Tailor First / Low Priority / Not a Fit
为什么是这个结论：哪些强、哪些证据不足、哪些缺失
```

---

### 问题 3：投之前要做什么

Fit Report 的重点是可执行的下一步：

```
Before you apply：投递前要完成的步骤，一次看一条，可以标记完成
CV suggestions：逐条的 CV 修改建议，附带原文、建议文本、理由和 CV 中的证据来源
```

---

### 问题 4：CV 和 JD 是否真实匹配

普通 match score 只看关键词，用户真正需要知道：

```
JD 的每一条要求，CV 中哪一行能证明
哪些要求证据不足
哪些要求完全缺失
```

项目和经历都属于 CV 的一部分，不单独管理。

---

### 问题 5：投出去以后怎么跟进

用户需要追踪：

```
投了哪些岗位，当前状态是什么
每一份申请的下一步是什么、截止日期是哪天
哪些 follow-up 已经逾期
```

---

## 9. 产品解决方案

OfferLoop 提供一个 AI 求职工作台，包括 6 个模块：

```
Dashboard      求职总览和下一步
CV Manager     管理 Base CV 和 Tailored CV（含经历和项目）
JD Analyzer    解析职位描述
Fit Reports    CV 与 JD 的匹配报告和投递前建议
Applications   投递记录、状态和下一步
Follow-ups     所有申请的 follow-up，按截止日期排列
```

导航结构：

```
桌面端：左侧导航，分组为 Overview / Prepare / Analyze / Track
手机端：底部 Tab：Home / CV / Analyze / Reports / Track
        Track 内切换 Applications 和 Follow-ups
```

---

## 10. 核心功能方向

### 10.1 Dashboard

展示用户当前最需要做的事和整体进展。

```
Your next step：当前最重要的下一步，可左右切换，可标记完成
Needs attention：逾期和即将到期的 follow-up
Summary cards：Fit Reports、Applications（按状态细分）、Interviews、Upcoming actions
Recent Fit Reports
Applications by status
```

新用户看到：下一步“添加 CV”，以及 4 步上手清单（添加 CV → 分析第一个 JD → 生成第一份 Fit Report → 保存到 Applications）。

---

### 10.2 CV Manager

管理简历内容和版本。经历和项目都写在 CV 里，没有单独的 Projects 模块。

```
上传 CV 文件（PDF / DOCX / TXT，最大 10MB）或粘贴 CV 文本
Base CV：默认用于新分析
Tailored CV：针对具体岗位的版本，标注来源 Fit Report
列表显示：标题、简介、经历 / 项目 / 技能数量、更新日期、更多操作
```

不设计 CV 详情页。

---

### 10.3 JD Analyzer

粘贴 Job Description，解析岗位要求。

输入：

```
JD 文本（最多 6,000 字符）
可选：Job URL、Company、Role title、Location、Work mode
```

输出：

```
Overview：岗位、公司、经验级别、地点、工作模式
Required skills / Preferred skills
Top responsibilities
Seniority signals
Visa sponsorship 信息
```

分析结果保存为 analyzed job，可以直接创建 Fit Report。

---

### 10.4 Fit Reports

比较一个 analyzed job 和用户的一份 CV。重点是投递前要做什么、CV 怎么改。

创建：

```
Step 1：选择 analyzed job
Step 2：选择 CV，最接近的 CV 标为 Recommended
证据只来自所选 CV
```

报告内容：

```
Header：Fit Score（0-100）、推荐标签、一句话总结、Save to Applications、Download PDF
1 Before you apply（重点）：逐条翻页，可标记完成
2 CV suggestions（重点）：逐条翻页，原文 / 建议文本 / 理由 / CV 来源，Copy 和 Mark as applied
Why this result：Strong / Needs stronger evidence / Missing
Evidence match：统计数字，以及每条要求和支撑它的 CV 原文
```

推荐标签：

```
Apply Now
Tailor First
Low Priority
Not a Fit
```

不单独设计 Role fit 区块。不提供“一键生成 tailored CV”，用户自己根据建议修改 CV。

---

### 10.5 Evidence-Based CV Suggestions

AI 只基于用户 CV 中的真实内容给建议。

原则：

```
不编造经历
不虚构技能
不夸大经验
只优化已有证据
缺失技能明确标记为 Missing
每条建议都标明 CV 中的来源
```

---

### 10.6 Applications

管理投递记录、状态和下一步。

```
状态：Saved / Ready to Apply / Applied / Interview / Offer / Rejected
列表：岗位和公司、状态、Fit Score、投递日期、下一步（逾期标红）
筛选、搜索、按下一步截止日期排序
详情：状态和更新菜单、Fit Score、所用 CV、投递日期、
      Next action（当前 follow-up、Mark done、Add follow-up）、
      申请信息、关联 Fit Report、时间线、已完成事项、笔记
```

Add follow-up：

```
关联申请
Action 下拉：Check application status / Follow up with recruiter /
            Prepare for interview / Prepare for assessment /
            Send thank-you message / Other（选择 Other 时 Note 必填，用来描述动作）
Due date：月历选择，快捷选项 Tomorrow / In 3 days / In 1 week
Note：可选，最多 300 字符
```

---

### 10.7 Follow-ups

集中展示所有申请的下一步，按截止日期排列。Follow-up 在申请详情里添加和编辑，这里用于查看和完成。

```
桌面端：左侧导航独立入口，红色角标显示逾期数量
手机端：Track Tab 中与 Applications 切换
Summary：Overdue / Due today / Rest of this week / Done this week
Open / Completed 两个 Tab
分组：Overdue / Today / This week / Later
每条：动作、岗位和公司、申请状态、截止日期、Mark done、View application
```

---

### 10.8 账号

```
Log in / Sign up / Forgot password / Reset password / Log out
密码规则：至少 8 个字符，包含数字和大写字母
不做社交登录
```

---

## 11. 产品边界

MVP 不做：

```
自动投递
自动爬取招聘网站
一键生成 / 自动改写整份 CV
招聘方后台
企业 HR 系统
法律 / 签证建议
虚构简历经历
完整 Cover Letter 平台
复杂 ATS 简历编辑器
薪资谈判功能
AI credits / 用量计费界面
```

尤其注意：

> Visa sponsorship / work authorisation 相关内容只作为 JD 信息整理，不构成法律建议。
>

---

## 12. 竞品差异化

现有竞品通常是：

```
通用 job tracker
通用 resume builder
ATS keyword checker
AI cover letter generator
```

OfferLoop 的差异是：

```
从 JD 到 Offer 的完整闭环，而不是单点工具
Fit Report 聚焦投递前的行动和 CV 建议，而不只是分数
Evidence-based：每条匹配和建议都指向 CV 中的真实内容
Follow-ups 独立管理，下一步有日期、有逾期提醒
桌面端和手机端都完整可用
Privacy-aware design
```

---

## 13. 产品成功标准

MVP 成功不在于功能多，而在于用户是否觉得：

```
我看懂了这个 JD 要什么
我知道这个岗位值不值得投
我知道投之前要做什么
我知道 CV 哪里匹配、该怎么改
我知道每份申请的下一步
我没有错过 follow-up
```

关键指标：

```
用户是否添加 CV
用户是否粘贴真实 JD
用户是否生成并查看 Fit Report
用户是否完成 Before you apply 步骤 / 采纳 CV suggestions
用户是否保存岗位到 Applications
用户是否添加并完成 follow-up
用户是否重复分析多个岗位
```

---

## 14. 研发价值

作为个人全栈项目，OfferLoop 可以展示：

```
产品需求分析
竞品分析
SaaS 架构设计
响应式 UI（桌面端 + 手机端）
用户认证
文件上传
PDF / DOCX 解析
AI API 集成
Prompt 设计
结构化 AI 输出
PostgreSQL 数据建模
Application tracker 与 follow-up 提醒
Dashboard analytics
权限控制
隐私和数据删除设计
云部署
CI/CD
```

这比普通 CRUD 项目更有求职价值。

---

## 15. 适合作为求职项目的原因

```
产品问题来自真实的技术求职经历
可以用自己的求职过程验证产品
覆盖前端、后端、AI 集成、数据建模和云部署
可以在面试中讲清楚问题来源、取舍和解决方案
```

面试叙事可以是：

> I built OfferLoop to solve a problem I experienced as a tech job seeker: understanding which roles are worth applying for, what to fix before applying, and keeping track of every follow-up until the offer.
>

---

## 16. 一句话总结

**OfferLoop** 是一个面向技术求职者的 AI 求职工作台。

它帮助用户：

```
看懂 JD 真正的要求
判断岗位是否值得投
知道投递前要做什么
基于真实证据修改 CV
追踪每一份申请
不错过任何 follow-up
```

核心卖点：

> **From JD to Offer in one loop.**
>
