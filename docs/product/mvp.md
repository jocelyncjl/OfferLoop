# GradFit Ireland MVP

## 1. MVP 定义

**GradFit Ireland MVP** 是一个面向爱尔兰 early-career 技术求职者的 AI 求职匹配工作台，尤其为国际毕业生设计。

MVP 的核心不是做一个完整求职平台，而是验证：

> 用户是否愿意上传 CV、粘贴真实 JD，并使用 AI 分析岗位是否值得投，以及如何用真实项目和经历证明自己匹配。
> 

核心闭环：

```
上传 CV
↓
添加项目 / 技能证据
↓
粘贴 JD
↓
AI 解析岗位要求
↓
AI 匹配 CV / 项目证据
↓
生成 Application Quality Score
↓
给出投递建议和 CV 修改建议
↓
保存岗位到 Application Tracker
```

---

## 2. MVP 核心目标

MVP 要验证 4 件事：

```
1. 用户是否愿意上传或粘贴真实 CV
2. 用户是否愿意用真实 JD 做分析
3. AI Evidence Matching 是否能帮助用户判断岗位是否值得投
4. Application Tracker 是否能让用户持续管理求职过程
```

---

## 3. MVP 一句话价值

> Know what to apply for. Prove why you fit.
> 

中文：

> 知道哪些岗位值得投，并证明你为什么匹配。
> 

---

## 4. MVP 目标用户

第一版目标用户：

```
Ireland-based graduates
International graduates in Ireland
Early-career tech candidates
Cloud / Software / Data / Cybersecurity students
Graduate / Junior tech role applicants
```

第一版重点岗位：

```
Graduate Software Engineer
Junior Backend Developer
Cloud Engineer
Junior DevOps Engineer
Data Analyst
Data Engineer
Cybersecurity Analyst
IT Support Engineer
Technical Support Engineer
QA Engineer
Tech-focused Business Analyst
```

---

## 5. MVP 页面结构

第一版建议包含 6 个页面：

```
Dashboard
CV Manager
Projects / Evidence
JD Analyzer
Fit Report
Applications
```

---

# 6. 页面与功能说明

## 6.1 Dashboard

页面目标：

> 展示用户整体求职进展和关键提醒。
> 

主要模块：

```
Total Applications
Applications This Week
Interviews
Average Application Quality Score
Top Missing Skills
Upcoming Follow-ups
Recent Fit Reports
```

验收标准：

```
用户能看到投递总数
用户能看到不同状态的申请数量
用户能看到近期 Fit Report
用户能看到缺失技能摘要
用户能看到 follow-up 提醒
```

---

## 6.2 CV Manager

页面目标：

> 上传、解析和管理用户 CV。
> 

主要功能：

```
上传 CV
粘贴 CV 文本
解析 CV 内容
查看 parsed CV
保存 Base CV
保存 Tailored CV version
```

MVP 可支持：

```
PDF 上传
文本粘贴
```

如果 PDF 解析成本太高，第一版可以先支持：

```
Paste CV text
```

CV 数据结构：

```
CV title
CV file / text
Parsed skills
Experience
Education
Projects
Certifications
Created date
```

验收标准：

```
用户能创建 Base CV
用户能粘贴或上传 CV
系统能保存 CV 文本
系统能提取基础技能关键词
用户能查看 CV 内容
```

---

## 6.3 Projects / Evidence

页面目标：

> 让技术毕业生记录可以证明技能的项目和经历。
> 

主要功能：

```
添加项目
编辑项目
添加技术栈
添加 GitHub URL
添加 Cloud services
添加项目 bullet
标记项目证明的技能
```

项目字段：

```
Project Name
Description
Tech Stack
GitHub URL
Cloud Provider
Key Features
Skills Proved
Project Bullets
```

示例：

```
Project: Serverless File Processing Pipeline
Tech Stack: AWS Lambda, S3, API Gateway, Python
Skills Proved: AWS, Serverless, Python, Cloud Architecture
```

验收标准：

```
用户能添加项目
用户能添加 tech stack
用户能标记 skills proved
系统能在 Fit Report 中引用项目证据
```

---

## 6.4 JD Analyzer

页面目标：

> 用户粘贴 Job Description，系统解析岗位要求。
> 

主要功能：

```
粘贴 JD
填写 Company
填写 Role Title
填写 Job URL
填写 Location
填写 Work Mode
AI 解析岗位要求
```

AI 需要提取：

```
Required Skills
Preferred Skills
Role Level
Experience Years
Responsibilities
Cloud / DevOps / Software / Data Skills
Location
Work Mode
Graduate / Junior Signals
Visa / Sponsorship Clues
```

验收标准：

```
用户能粘贴 JD
系统能提取技术技能
系统能判断岗位级别
系统能识别 graduate / junior 信号
系统能识别地点和工作模式
```

---

## 6.5 Fit Report

页面目标：

> 展示 CV 和 JD 的真实匹配关系，并给出投递建议。
> 

这是 MVP 的核心页面。

核心模块：

```
Application Quality Score
Recommendation
Score Breakdown
Matched Evidence
Weak Evidence
Missing Skills
Role Level Fit
Location / Work Authorisation Notes
CV Improvement Suggestions
Suggested Projects to Highlight
```

Application Quality Score 维度：

```
CV-JD Match
Evidence Strength
Role Level Fit
Skill Gap Severity
Location Fit
Application Effort Required
```

推荐标签：

```
Apply Now
Tailor First
Low Priority
Not a Fit
```

示例输出：

```
Application Quality Score: 78
Recommendation: Tailor First

Why:
- Your AWS project is relevant to this role.
- Your CV does not clearly mention CI/CD.
- Docker is required but no evidence was found.
- The role appears suitable for graduate / junior candidates.
```

验收标准：

```
系统能生成 Application Quality Score
系统能显示匹配技能
系统能显示缺失技能
系统能引用用户项目作为证据
系统能给出投递建议
系统能给出基于真实经历的 CV 修改建议
```

---

## 6.6 Applications

页面目标：

> 管理投递记录和投递状态。
> 

主要功能：

```
保存岗位
查看岗位列表
更新投递状态
添加 applied date
添加 deadline
添加 follow-up date
添加 notes
查看 Fit Report
```

状态：

```
Saved
Ready to Apply
Applied
Interview
Assessment
Rejected
Offer
Archived
```

字段：

```
Company
Role Title
Job URL
Location
Work Mode
Application Status
Application Quality Score
Recommendation
Deadline
Applied Date
Follow-up Date
Notes
Visa Sponsorship Mentioned
```

验收标准：

```
用户能保存岗位到 tracker
用户能更新状态
用户能查看岗位详情
用户能查看对应 Fit Report
用户能看到 follow-up 日期
```

---

# 7. MVP 核心 AI 功能

## 7.1 JD Parsing

输入：

```
Job Description
```

输出：

```
Required skills
Preferred skills
Role level
Responsibilities
Experience years
Tech categories
Graduate / junior signals
Location / work mode
Sponsorship clues
```

---

## 7.2 CV / Project Evidence Extraction

输入：

```
CV text
Projects
Skills
```

输出：

```
Detected skills
Detected experience
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
Project evidence
```

输出：

```
Matched evidence
Weak evidence
Missing skills
Evidence strength
Relevant projects
```

---

## 7.4 Application Quality Score

输入：

```
CV-JD match
Evidence strength
Role level fit
Skill gaps
Location / work authorisation notes
```

输出：

```
Score
Recommendation
Reasoning
Next actions
```

---

## 7.5 Evidence-Based CV Suggestions

输入：

```
JD requirements
CV bullets
Project evidence
```

输出：

```
Current bullet
Suggested bullet
Related JD requirement
Evidence source
Why this helps
```

规则：

```
不能编造经历
不能加入用户没有提供的技能
只能优化真实已有内容
缺失技能必须标记为 missing
```

---

# 8. MVP 数据对象

核心数据对象：

```
User
CV
Project
Skill
Job
JobAnalysis
FitReport
Application
CVSuggestion
FollowUp
```

---

# 9. MVP 不做内容

第一版不做：

```
自动投递
自动爬取招聘网站
Chrome Extension
Cover Letter Generator
完整 CV Builder
招聘方后台
企业 HR 系统
法律 / 签证建议
薪资谈判
面试模拟
邮件提醒自动发送
```

特别注意：

```
Visa / sponsorship 字段只做信息整理和提醒，不构成法律建议。
```

---

# 10. MVP 推荐开发顺序

## Phase 1: 基础系统

```
用户登录
基础 Dashboard
数据库模型
```

## Phase 2: CV 与项目证据

```
CV Manager
CV text 保存
Projects / Evidence
Skills proved
```

## Phase 3: JD Analyzer

```
JD 输入
JD AI parsing
技能提取
岗位级别提取
```

## Phase 4: Fit Report

```
Evidence Matching
Application Quality Score
Missing Skills
CV Suggestions
Recommended Projects
```

## Phase 5: Application Tracker

```
保存岗位
状态管理
Follow-up date
Dashboard 汇总
```

---

# 11. MVP 验收标准

MVP 至少满足：

```
用户可以添加 CV
用户可以添加项目证据
用户可以粘贴 JD
AI 可以解析 JD 技能和岗位级别
系统可以匹配 CV / Project evidence
系统可以生成 Application Quality Score
系统可以输出 Apply Now / Tailor First / Low Priority / Not a Fit
系统可以给出 evidence-based CV suggestions
用户可以保存岗位到 Application Tracker
用户可以更新投递状态
Dashboard 可以展示基础统计
```

---

# 12. MVP 成功指标

产品指标：

```
用户是否上传 CV
用户是否添加项目
用户是否粘贴真实 JD
用户是否查看完整 Fit Report
用户是否保存 application
用户是否更新 application status
用户是否重复分析多个岗位
```

价值信号：

```
用户说“这个帮我判断岗位是否值得投”
用户能根据报告修改 CV
用户发现自己的技能缺口
用户开始用 tracker 管理投递
用户愿意继续分析下一个岗位
```

---

# 13. 一句话总结

GradFit Ireland MVP 的核心是：

> 帮助爱尔兰 early-career 技术求职者，用真实 CV 和项目证据判断一个岗位是否值得投，并系统管理投递过程。
> 

它不是普通简历工具，而是：

```
Application decision workspace
+
CV-JD evidence matching
+
Early-career tech job tracker
```

核心卖点：

> **Know what to apply for. Prove why you fit.**
>