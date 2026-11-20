# OfferLoop 数据模型

## 这份文档是什么

这份文档说明 OfferLoop 需要在数据库里**存哪些东西**。

可以把数据库想成一个文件柜，里面有很多张表格：

- 每**一类东西**是一张表，比如"简历"一张表、"申请"一张表。
- 表里的**每一行**是一条记录，比如用户上传的一份简历。
- 表里的**每一列**是这条记录的一项信息，比如简历的标题、上传时间。

产品功能见 `docs/product/mvp.md`，页面设计见 `docs/ui/`。

---

## 一、先看全貌：用户做一件事，就存一条记录

按用户的使用顺序，一共有 11 类东西：

| 第几步 | 用户在页面上做了什么 | 存进哪张表 |
| --- | --- | --- |
| 1 | 注册账号 | 用户 `users` |
| 2 | 上传或粘贴 CV | 简历 `cvs` |
| 3 | 粘贴一段 JD | 岗位 `jobs` |
| 4 | 点击 Analyze JD | JD 分析结果 `job_analyses` |
| 5 | 生成 Fit Report | 匹配报告 `fit_reports` |
| 5a | 报告里的 Evidence match | 证据匹配 `evidence_matches` |
| 5b | 报告里的 Before you apply | 投递前步骤 `before_you_apply_steps` |
| 5c | 报告里的 CV suggestions | 简历修改建议 `cv_suggestions` |
| 6 | 保存到 Applications | 申请 `applications` |
| 6a | 申请详情里的时间线 | 时间线记录 `application_events` |
| 7 | Add follow-up | 跟进事项 `follow_ups` |

**没有"项目"表。** 项目和工作经历都写在 CV 里，系统从 CV 中解析出来，和 CV 存在一起。

---

## 二、它们之间是什么关系

用一个例子串起来：

> Alex 注册了账号（**用户**），上传了一份 Base CV（**简历**）。
> 他粘贴了 Northwind Labs 的 Backend Engineer JD（**岗位**），点击分析，得到一份**分析结果**。
> 他用这份分析结果和他的 Base CV 生成了一份 **Fit Report**，得分 85，推荐 Apply Now。
> 报告里有 12 条**证据匹配**、3 条**投递前步骤**、4 条**简历修改建议**。
> 他把这个岗位保存到 Applications（**申请**），状态改成 Applied（**时间线**记下这次变化）。
> 他添加了一个"7 天后跟进招聘人员"的 **follow-up**。

整理成"谁属于谁"：

```
一个用户
 ├─ 可以有多份简历
 ├─ 可以有多个岗位
 │    └─ 一个岗位可以分析多次（每次一份分析结果）
 ├─ 可以有多份 Fit Report
 │    │  一份报告 = 一份分析结果 + 一份简历
 │    ├─ 多条证据匹配
 │    ├─ 多条投递前步骤
 │    └─ 多条简历修改建议
 └─ 可以有多份申请
      │  一份申请对应一个岗位，可以关联一份 Fit Report 和一份简历
      ├─ 多条时间线记录
      └─ 多个 follow-up
```

两组容易混淆的概念：

| 概念 | 意思 |
| --- | --- |
| 岗位 vs 分析结果 | 岗位是 JD 原文；分析结果是对它的一次分析。重新分析会多一份分析结果，岗位还是那一个。 |
| Fit Report vs 申请 | Fit Report 回答"值不值得投、要怎么改"；申请记录"投了没有、进行到哪一步"。可以先有申请、后做报告。 |

---

## 三、每张表记什么

每张表都会自动带上 `id`（编号）、`created_at`（创建时间）和 `updated_at`（更新时间），下面不再重复列出。

### 1. 用户 `users`

注册的账号，所有数据都属于某个用户。后端已经有这张表。忘记密码用的重置链接也已经有表：`password_reset_tokens`。

MVP 不做社交登录，也没有单独的个人设置页面。

现有的 `users` 表需要按设计调整：

| 字段 | 意思 | 例子 |
| --- | --- | --- |
| `full_name` | 注册时填写的姓名（新增） | Alex Chen |
| `email` | 登录用的邮箱，唯一 | alex@example.com |
| `password` | bcrypt 加密后的密码 | |
| `timezone` | 用户所在时区，用来判断"今天"和"逾期"（新增） | Europe/Dublin |

原来必填的 `username` 不再使用。

### 2. 简历 `cvs`

| 字段 | 意思 | 例子 |
| --- | --- | --- |
| `user_id` | 属于哪个用户 | |
| `title` | 简历标题 | Alex Chen – Base CV |
| `type` | 主简历还是定制版 | `base` / `tailored` |
| `is_default` | 是否是默认简历（新分析默认用它），每个用户只有一份 | 是 |
| `description` | 列表里显示的一句简介 | Main version · Default for new analyses |
| `source_fit_report_id` | 定制版是根据哪份 Fit Report 改的（可以为空） | Northwind Labs 那份报告 |
| `input_method` | 上传文件还是粘贴文本 | `file` / `paste` |
| `file_key`、`file_name`、`file_type` | 上传的文件（PDF / DOCX / TXT，最大 10MB） | alex-cv.pdf |
| `raw_text` | 简历全文，最多 20,000 字符 | |
| `parsed_content` | 系统解析出的经历、项目、技能、教育、证书 | |
| `experience_count`、`project_count`、`skill_count` | 数量，列表里显示 | 2 experiences · 4 projects · 18 skills |
| `parse_status` | 解析状态 | 解析中 / 完成 / 失败 |

### 3. 岗位 `jobs`

| 字段 | 意思 | 例子 |
| --- | --- | --- |
| `user_id` | 属于哪个用户 | |
| `jd_text` | JD 原文，最多 6,000 字符 | |
| `job_url` | 职位链接（可选） | |
| `company` | 公司（可选） | Northwind Labs |
| `role_title` | 职位（可选） | Backend Engineer |
| `location` | 地点（可选） | Remote (Europe) |
| `work_mode` | 工作方式 | 现场 / 混合 / 远程 / 未知 |

### 4. JD 分析结果 `job_analyses`

| 字段 | 意思 | 例子 |
| --- | --- | --- |
| `job_id` | 分析的是哪个岗位 | |
| `experience_level` | 经验级别 | entry / junior / mid / senior / lead |
| `experience_years` | 年限要求 | 2+ years |
| `required_skills` | 必备技能 | Python, AWS, Docker |
| `preferred_skills` | 加分技能 | Kubernetes, Terraform |
| `responsibilities` | 主要职责 | |
| `seniority_signals` | JD 里体现级别的句子 | "mentor junior engineers" |
| `visa_sponsorship` | 签证担保：提供 / 不提供 / 没提到（只作记录，不构成法律建议） | 没提到 |
| `location`、`work_mode` | 从 JD 中识别出的地点和工作方式 | |
| `model`、`prompt_version` | 用了哪个 AI 模型和哪个版本的提示词 | |
| `status` | 分析状态 | 进行中 / 完成 / 失败 |

### 5. 匹配报告 `fit_reports`

| 字段 | 意思 | 例子 |
| --- | --- | --- |
| `user_id` | 属于哪个用户 | |
| `job_id`、`job_analysis_id` | 用的是哪个岗位、哪一次分析结果 | |
| `cv_id` | 用的是哪份简历 | Base CV |
| `cv_title_snapshot` | 生成时简历的标题；简历被删后，报告里仍能显示 | Alex Chen – Base CV |
| `score` | 分数，0–100 | 85 |
| `recommendation` | 推荐 | Apply Now / Tailor First / Low Priority / Not a Fit |
| `summary` | 一句话总结 | |
| `model`、`prompt_version` | 用了哪个 AI 模型和提示词版本 | |
| `status` | 生成状态 | 进行中 / 完成 / 失败 |

说明：

- 报告里没有单独的 Role fit 区块，岗位级别只作为打分的一个因素。
- "用另一份 CV 生成"会新建一份报告。
- 下载 PDF 时临时生成，不保存。

### 5a. 证据匹配 `evidence_matches`

对应报告里的 **Evidence match**：JD 的每一条要求，一行记录。

| 字段 | 意思 | 例子 |
| --- | --- | --- |
| `fit_report_id` | 属于哪份报告 | |
| `requirement` | JD 的一条要求 | Experience with Docker |
| `requirement_type` | 必备还是加分 | 必备 / 加分 |
| `strength` | CV 中的证据强度 | 强 / 需要更强的证据 / 缺失 |
| `cv_excerpt` | CV 中能证明它的那句话（缺失时为空） | "Containerized services with Docker…" |
| `cv_section` | 这句话在 CV 的哪一部分 | Projects · Serverless pipeline |
| `position` | 显示顺序 | 1 |

报告中 **Why this result** 的数字（几条强、几条弱、几条缺失）直接从这张表统计，不另外存。

### 5b. 投递前步骤 `before_you_apply_steps`

对应报告里的 **Before you apply**：一步一行，在报告里一页显示一条。

| 字段 | 意思 | 例子 |
| --- | --- | --- |
| `fit_report_id` | 属于哪份报告 | |
| `text` | 要做什么 | 在 CV 中写清楚 CI/CD 经验 |
| `position` | 第几步 | 1 |
| `done_at` | 点击 Mark as done 的时间；没完成时为空 | |

### 5c. 简历修改建议 `cv_suggestions`

对应报告里的 **CV suggestions**：一条建议一行，在报告里一页显示一条。用户自己去改 CV，系统不会自动修改。

| 字段 | 意思 | 例子 |
| --- | --- | --- |
| `fit_report_id` | 属于哪份报告 | |
| `current_text` | CV 现在的写法 | Built Python services on AWS Lambda. |
| `suggested_text` | 建议改成 | Built and deployed Python services on AWS Lambda with a GitHub Actions CI/CD pipeline. |
| `reason` | 为什么这样改 | 岗位要求 CI/CD |
| `related_requirement` | 对应 JD 的哪条要求 | CI/CD experience |
| `source_section` | 依据来自 CV 的哪部分（必须来自真实内容） | Projects · Serverless pipeline |
| `position` | 第几条 | 1 |
| `applied_at` | 点击 Mark as applied 的时间；没采纳时为空 | |

### 6. 申请 `applications`

| 字段 | 意思 | 例子 |
| --- | --- | --- |
| `user_id` | 属于哪个用户 | |
| `job_id` | 申请的是哪个岗位（必填） | |
| `fit_report_id` | 关联的 Fit Report（可以为空，因为可以先建申请再做报告） | |
| `cv_id` | 投递用的简历（可以为空） | |
| `status` | 状态 | Saved / Ready to Apply / Applied / Interview / Offer / Rejected |
| `applied_at` | 投递日期；第一次变成 Applied 时自动记录，可以修改 | Nov 13 |
| `notes` | 笔记 | |

申请列表里显示的分数和推荐，取自关联的 Fit Report。

### 6a. 时间线记录 `application_events`

对应申请详情里的**时间线**。由系统自动写入，用户不能编辑。

| 字段 | 意思 | 例子 |
| --- | --- | --- |
| `application_id` | 属于哪份申请 | |
| `type` | 发生了什么 | 创建申请 / 状态变化 / 添加 follow-up / 完成 follow-up / 修改笔记 |
| `from_status`、`to_status` | 状态从什么变成什么（只有状态变化时才填） | Applied → Interview |
| `follow_up_id` | 相关的 follow-up（只有 follow-up 相关的记录才填） | |
| `occurred_at` | 发生时间 | |

### 7. 跟进事项 `follow_ups`

在申请详情里添加和修改；Follow-ups 页面把所有申请的 follow-up 汇总在一起显示。

| 字段 | 意思 | 例子 |
| --- | --- | --- |
| `application_id` | 属于哪份申请 | |
| `action` | 动作（下拉选项） | Check application status / Follow up with recruiter / Prepare for interview / Prepare for assessment / Send thank-you message / Other |
| `note` | 备注，最多 300 字符；选 Other 时必填，用来写具体动作 | |
| `due_date` | 截止日期（日历选择，或 Tomorrow / In 3 days / In 1 week） | Nov 22 |
| `completed_at` | 点击 Mark done 的时间；没完成时为空 | |

---

## 四、不用存、每次现算的内容

下面这些页面上能看到，但不单独存，打开页面时根据上面的表算出来：

| 页面上看到的 | 怎么算 |
| --- | --- |
| 某个 follow-up 逾期（红色） | 还没完成，并且截止日期早于今天（按用户所在时区） |
| Follow-ups 页的分组：Overdue / Today / This week / Later | 按截止日期分组 |
| 申请的 Next action | 这份申请中还没完成、截止日期最早的 follow-up |
| 左侧导航 Follow-ups 的红色数字 | 逾期 follow-up 的数量 |
| 申请列表上方的数量和状态筛选数字 | 按状态统计申请 |

### Dashboard

Dashboard 自己不存任何数据，所有内容都是现算的：

| Dashboard 上的区域 | 数据来源 |
| --- | --- |
| Your next step | 还没完成的 follow-up，按截止日期排序；新用户显示第一个没完成的上手步骤 |
| Needs attention | 逾期和快到期的 follow-up |
| Fit Reports 卡片 | 报告总数，以及和上个月比较的变化 |
| Applications 卡片 | 申请总数，以及每个状态的数量 |
| Interviews 卡片 | 状态为 Interview 的申请数量 |
| Upcoming actions 卡片 | 还没完成的 follow-up 数量 |
| Recent Fit Reports | 最近生成的报告 |
| Applications by status | 每个状态的申请数量 |

新用户的 4 步上手进度，也是看数据有没有：

| 上手步骤 | 什么时候算完成 |
| --- | --- |
| Add your CV | 有至少一份简历 |
| Analyze your first JD | 有至少一份完成的分析结果 |
| Get your first Fit Report | 有至少一份完成的报告 |
| Save it to Applications | 有至少一份申请 |

---

## 五、删除时会怎样

| 用户删除了什么 | 结果 |
| --- | --- |
| 一份简历 | 用它生成的报告和申请都**保留**，只是不再关联这份简历；报告仍显示当时的简历标题。 |
| 一份 Fit Report | 报告里的证据匹配、投递前步骤和修改建议**一起删除**；关联的申请保留，只是不再关联报告。 |
| 一份申请 | 它的时间线和 follow-up **一起删除**。 |
| 整个账号 | 这个用户的**所有数据**都删除。 |

---

## 六、MVP 不包含

- 单独的项目表（项目在 CV 里）
- 通知（右上角铃铛的数字）
- AI 用量 / credits

---

## 附录：给开发看的技术细节

### 表结构

```text
users                      (已有)
password_reset_tokens      (已有)
cvs
jobs
job_analyses
fit_reports
evidence_matches
before_you_apply_steps
cv_suggestions
applications
application_events
follow_ups
```

### 外键（表与表之间靠编号连接）

`A.x → B.id` 的意思是：A 表的 x 列存的是 B 表某一行的编号。

```text
cvs.user_id → users.id
cvs.source_fit_report_id → fit_reports.id               可为空，报告删除时置空
jobs.user_id → users.id
job_analyses.job_id → jobs.id
fit_reports.user_id → users.id
fit_reports.job_id → jobs.id
fit_reports.job_analysis_id → job_analyses.id
fit_reports.cv_id → cvs.id                              可为空，简历删除时置空
evidence_matches.fit_report_id → fit_reports.id         报告删除时一起删除
before_you_apply_steps.fit_report_id → fit_reports.id   报告删除时一起删除
cv_suggestions.fit_report_id → fit_reports.id           报告删除时一起删除
applications.user_id → users.id
applications.job_id → jobs.id
applications.fit_report_id → fit_reports.id             可为空，报告删除时置空
applications.cv_id → cvs.id                             可为空，简历删除时置空
application_events.application_id → applications.id     申请删除时一起删除
application_events.follow_up_id → follow_ups.id         可为空，follow-up 删除时置空
follow_ups.application_id → applications.id             申请删除时一起删除
```

### 建议的索引（加快查询）

```text
cvs (user_id)，以及 (user_id) 在 is_default 为真时唯一
jobs (user_id, created_at)
fit_reports (user_id, created_at)、(job_analysis_id)、(cv_id)
applications (user_id, status)
follow_ups (application_id)、(due_date) 仅限未完成的
```

### 权限

每次读写数据都要检查这条记录是否属于当前登录的用户。
