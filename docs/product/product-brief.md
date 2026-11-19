# GradFit Ireland 产品需求文件

## 1. 产品名称

**GradFit Ireland**

名称含义：

```
Grad = Graduate / 毕业生
Fit = 岗位匹配 / 申请适配度
Ireland = 面向爱尔兰求职市场
```

产品短名：

```
GradFit
```

---

## 2. 产品一句话定位

**GradFit Ireland is an AI application fit workspace for Ireland-based graduates and early-career tech candidates, designed especially for international graduates.**

中文定位：

> GradFit Ireland 是一个面向爱尔兰毕业生和 early-career 技术求职者的 AI 投递匹配工作台，尤其为国际毕业生设计。
> 

---

## 3. 产品核心理念

GradFit Ireland 不只是帮用户管理投递记录，也不只是给简历打一个匹配分。

它真正要解决的是：

> 求职者不知道哪些岗位值得投，也不知道如何用自己的真实经历证明自己匹配岗位。
> 

所以产品核心是：

```
帮助用户判断岗位是否值得投
帮助用户理解 CV 和 JD 的真实匹配关系
帮助用户找到可以证明岗位要求的项目和经历
帮助用户发现关键技能缺口
帮助用户基于真实证据优化 CV
帮助用户系统管理投递过程
```

---

## 4. 核心卖点

推荐核心卖点：

> **Know what to apply for. Prove why you fit.**
> 

中文：

> 知道哪些岗位值得投，并证明你为什么匹配。
> 

辅助卖点：

```
Not just a match score — an application decision.
不只是匹配分，而是投递决策。

No fake experience — only evidence-based CV suggestions.
不编造经历，只基于真实证据优化简历。

Built for Ireland-based early-career tech candidates.
为爱尔兰 early-career 技术求职者设计。
```

---

## 5. 产品背景与灵感来源

作为爱尔兰的国际毕业生，尤其是技术专业毕业生，在求职过程中会遇到一些非常具体的问题：

```
不知道哪些岗位适合 graduate / junior 阶段
不知道 JD 中哪些技能是核心要求
不知道自己的 CV 是否真的匹配岗位
不知道项目经历能不能证明岗位要求
不知道哪些技能只是关键词缺失，哪些是真正能力缺口
不知道如何针对不同岗位调整 CV
投递很多岗位后管理混乱
不清楚哪些岗位需要 follow-up
对 work authorisation / sponsorship 信息敏感但难以整理
```

现有工具通常解决的是：

```
简历润色
ATS 关键词匹配
投递记录管理
Cover letter 生成
```

但它们往往没有深入解决：

```
这个岗位对我是否值得投？
我是 graduate，这个岗位级别是否合适？
我的项目经历能否证明我符合 JD？
我缺的是表达不明显，还是技能本身不足？
```

GradFit Ireland 就是从这些真实求职痛点中产生的产品想法。

---

## 6. 目标用户

### 6.1 核心用户

第一阶段核心用户是：

```
在爱尔兰求职的国际毕业生
Graduate / early-career 技术岗位求职者
云计算、软件工程、数据、网络安全相关专业毕业生
正在投递 graduate / junior / entry-level 技术岗位的人
```

---

### 6.2 典型用户画像

用户画像 1：

```
身份：国际研究生
地点：Ireland
专业：Cloud Computing / Computer Science
阶段：即将毕业或毕业 0-2 年
目标岗位：Graduate Cloud Engineer / Junior DevOps Engineer / Software Engineer
痛点：不知道自己的 CV 和岗位是否匹配，不知道项目应该怎么写进简历
```

用户画像 2：

```
身份：early-career tech candidate
地点：Ireland
背景：有一些项目经验或实习经验
目标岗位：Backend Developer / Data Analyst / QA Engineer
痛点：投递很多岗位但缺少系统管理，也不知道哪些岗位优先级更高
```

用户画像 3：

```
身份：国际毕业生
地点：Ireland
签证 / 工作授权状态：需要关注 sponsorship 或 work authorisation
目标：找到 graduate / junior 技术岗位
痛点：很多岗位看起来不错，但不确定是否现实可投
```

---

## 7. 用户范围选择

GradFit Ireland 第一版应该聚焦：

```
Ireland-based
Graduates / early-career
Tech / tech-adjacent roles
Designed especially for international graduates
```

---

### 7.1 为什么基于 Ireland

因为这是产品最大差异点之一。

Ireland focus 可以覆盖：

```
爱尔兰本地岗位市场
Graduate programme
Dublin / Cork / Galway / Limerick 技术岗位
Irish CV 风格
Work authorisation notes
Visa sponsorship information tracking
```

---

### 7.2 为什么聚焦 graduates / early-career

因为这个群体的问题更明确：

```
经验少
项目经历重要
不知道岗位级别是否适合
不知道如何证明技能
需要大量投递和追踪
需要简历定制指导
```

Senior candidate 的需求不同，不适合作为 MVP 目标。

---

### 7.3 为什么先聚焦 tech / tech-adjacent

因为技术岗位更适合结构化分析。

Tech JD 通常包含明确技能：

```
AWS
Azure
Docker
Kubernetes
Terraform
CI/CD
Python
Java
Go
SQL
Linux
Networking
Security
```

这适合做：

```
技能提取
证据匹配
项目映射
技能缺口分析
Application Quality Score
```

---

### 7.4 为什么尤其适合国际毕业生

国际毕业生有额外痛点：

```
不熟悉爱尔兰求职市场
对工作授权信息敏感
简历表达不确定
不知道如何判断岗位是否现实
需要更明确的投递优先级
```

但产品不应该排除本地毕业生。

更合适的表述是：

> Designed especially for international graduates, but useful for all Ireland-based early-career tech candidates.
> 

---

## 8. 核心问题定义

GradFit Ireland 要解决 5 个核心问题。

### 问题 1：岗位是否值得投

用户看到一个岗位时，不知道：

```
这个岗位是不是适合 graduate？
这个岗位是不是太 senior？
我的背景是否有机会？
这个岗位要不要优先投？
```

---

### 问题 2：CV 和 JD 是否真实匹配

普通 match score 只看关键词，但用户真正需要知道：

```
我的 CV 中哪里能证明我会 AWS？
我的项目能不能证明我有 CI/CD 经验？
我只是没写 Docker，还是我真的没有 Docker 经验？
```

---

### 问题 3：项目经历如何证明岗位要求

技术毕业生常有项目，但不知道如何表达。

例如：

```
Cloud project
Backend API
Data pipeline
CI/CD pipeline
Security lab
Final year project
GitHub portfolio
```

GradFit 要帮助用户判断：

```
哪个项目最适合这个岗位
项目中的哪些 bullet 应该突出
哪些技能证据最强
```

---

### 问题 4：技能缺口在哪里

用户需要知道：

```
哪些缺失技能是 critical
哪些是 nice-to-have
哪些可以通过项目补足
哪些只是 CV 表达不明显
```

---

### 问题 5：投递过程如何管理

用户需要追踪：

```
投了哪些岗位
当前状态是什么
哪些岗位需要 follow-up
哪些岗位高质量
哪些岗位回复率更高
```

---

## 9. 产品解决方案

GradFit Ireland 提供一个 AI 求职工作台，包括：

```
Application Tracker
CV Manager
JD Analyzer
Evidence Matching
Application Quality Score
Project-to-Role Mapping
Skill Gap Analysis
Evidence-Based CV Suggestions
Dashboard
```

---

## 10. 核心功能方向

### 10.1 Application Tracker

用于管理投递记录。

包括：

```
Company
Role title
Job URL
Location
Work mode
Application status
Deadline
Applied date
Follow-up date
Visa sponsorship mentioned
Work authorisation notes
Application quality recommendation
```

---

### 10.2 CV Manager

用于管理简历内容和版本。

包括：

```
Base CV
Parsed CV text
Tailored CV versions
Skills
Projects
Education
Experience
Certifications
```

---

### 10.3 JD Analyzer

用于解析 Job Description。

提取：

```
Required skills
Preferred skills
Role level
Seniority
Experience years
Location
Work mode
Cloud / DevOps / Software / Data skills
Visa / sponsorship clues
Graduate / junior keywords
```

---

### 10.4 Evidence Matching

用于把 JD 要求映射到用户 CV 和项目经历。

输出：

```
Matched skills
Evidence found
Weak evidence
Missing skills
Relevant projects
Suggested CV sections
```

---

### 10.5 Application Quality Score

不是普通 match score，而是投递质量判断。

维度：

```
CV-JD Match
Evidence Strength
Role Level Fit
Skill Gap Severity
Location / Work Authorisation Fit
Application Effort Required
```

输出：

```
Apply Now
Tailor First
Low Priority
Not a Fit
```

---

### 10.6 Evidence-Based CV Suggestions

AI 只基于用户真实经历给建议。

原则：

```
不编造经历
不虚构技能
不夸大经验
只优化已有证据
缺失技能明确标记为 gap
```

---

### 10.7 Project-to-Role Mapping

用于帮助技术毕业生选择最适合岗位的项目经历。

输出：

```
Recommended projects
Relevant project bullets
Skills proved by each project
Missing project evidence
```

---

### 10.8 Dashboard

用于展示求职进展。

包括：

```
Total applications
Applied this week
Interviews
Response rate
Average Application Quality Score
Top missing skills
Upcoming follow-ups
Applications by status
```

---

## 11. 产品边界

MVP 不做：

```
自动投递
自动爬取招聘网站
招聘方后台
企业 HR 系统
法律 / 签证建议
虚构简历经历
完整 Cover Letter 平台
复杂 ATS 简历编辑器
薪资谈判功能
```

尤其注意：

> Work authorisation / visa sponsorship 相关内容只作为求职信息整理和提醒，不构成法律建议。
> 

---

## 12. 竞品差异化

现有竞品通常是：

```
通用 job tracker
通用 resume builder
ATS keyword checker
AI cover letter generator
泛欧洲 job matching
```

GradFit Ireland 的差异是：

```
Ireland-based
Graduate / early-career focused
Tech / tech-adjacent first
International graduate friendly
Evidence-based CV-JD matching
Application Quality Score
Project-to-role mapping
Privacy-aware design
```

---

## 13. 产品成功标准

MVP 成功不在于功能多，而在于用户是否觉得：

```
我知道这个岗位是否值得投
我知道我的 CV 哪里匹配
我知道哪个项目最能证明我
我知道缺哪些关键技能
我知道投递前该如何调整 CV
我可以更系统地管理求职
```

关键指标：

```
用户是否上传 CV
用户是否粘贴真实 JD
用户是否查看 Fit Report
用户是否保存岗位到 Tracker
用户是否根据建议修改 CV
用户是否重复使用多个岗位分析
```

---

## 14. 研发价值

作为个人全栈项目，GradFit Ireland 可以展示：

```
产品需求分析
竞品分析
SaaS 架构设计
用户认证
文件上传
PDF / DOCX 解析
AI API 集成
Prompt 设计
结构化 AI 输出
PostgreSQL 数据建模
Application tracker
Dashboard analytics
权限控制
隐私和数据删除设计
云部署
CI/CD
```

这比普通 CRUD 项目更有求职价值。

---

## 15. 适合作为求职项目的原因

这个项目特别适合你的背景，因为：

```
你 based in Ireland
你是国际毕业生
你是云计算专业
你正在找 graduate / early-career 技术岗位
你可以用自己的真实求职过程验证产品
你可以在面试中讲清楚问题来源和解决方案
```

面试叙事可以是：

> I built GradFit Ireland to solve a real problem I experienced as an international cloud computing graduate in Ireland: understanding which early-career tech roles are worth applying for and how to prove fit with real CV and project evidence.
> 

---

## 16. 一句话总结

**GradFit Ireland** 是一个面向爱尔兰毕业生和 early-career 技术求职者的 AI 投递匹配工作台，尤其为国际毕业生设计。

它的核心不是简单修改简历，而是帮助用户：

```
判断岗位是否值得投
理解 CV 和 JD 的真实匹配关系
用项目和经历证明岗位适配度
发现关键技能缺口
管理整个求职流程
```

核心卖点：

> **Know what to apply for. Prove why you fit.**
>