# OfferLoop 用户流程

## 这份文档是什么

这份文档说明用户在 OfferLoop 里**一步一步怎么操作**，以及每一步系统应该做什么。

- 页面长什么样：见 `docs/ui/`
- 产品功能和范围：见 `docs/product/mvp.md`
- 数据怎么存：见 `docs/architecture/data-model.md`

---

## 一、完整流程总览

```text
注册 → 登录
  → 添加 CV（含经历和项目）
  → 粘贴 JD 并分析
  → 选择 CV，生成 Fit Report
  → 按 Before you apply 和 CV suggestions 自己修改 CV
  → 保存到 Applications
  → 投递后更新状态
  → 添加 follow-up，到期完成
  → 下一个 JD
```

新用户登录后，Dashboard 会显示 4 步上手清单，带着用户走完前半段：

```text
Add your CV → Analyze your first JD → Get your first Fit Report → Save it to Applications
```

---

## 二、账号

### 注册

```text
打开 Sign up
  → 填写 Full name、Email address、Password
  → 页面实时检查密码规则
  → 点击注册
  → 后端校验并创建账号
  → 跳转到 Log in
```

| 规则 | 说明 |
| --- | --- |
| 密码 | 至少 8 个字符，包含数字和大写字母；输入时实时显示是否满足 |
| 提交前 | 姓名去掉首尾空格；邮箱去掉首尾空格并转为小写；密码保持原样 |
| 防重复 | 提交中按钮不可再点 |
| 后端 | 独立校验所有规则；密码用 bcrypt 加密；永不返回密码；成功返回 `201 Created` |

| 情况 | 用户看到 |
| --- | --- |
| 注册成功 | 跳转到 Log in |
| 输入不符合规则 | 表单保留，对应字段显示提示 |
| 邮箱已注册 | 邮箱字段提示该邮箱已注册 |
| 网络或服务器错误 | 显示重试提示，表单仍可使用 |

### 登录

```text
打开 Log in
  → 输入邮箱和密码
  → 后端验证
  → 成功：进入 Dashboard
  → 失败：显示统一的"邮箱或密码错误"，不透露是哪一项错
```

已登录的用户打开 Log in 或 Sign up，直接跳转到 Dashboard。

### 忘记密码 / 重置密码

```text
Log in 页点击 Forgot password
  → 输入邮箱，发送重置链接
  → 页面切换为 "Check your email"
  → 用户点击邮件中的链接，打开 Reset password
  → 输入新密码（同样实时检查规则）
  → 重置成功，回到 Log in
```

无论邮箱是否注册过，都显示 "Check your email"，避免泄露账号是否存在。

### 退出

```text
点击左下角账号区域（手机端为右上角头像）
  → Log out
  → 结束登录状态
  → 回到 Log in
```

退出后打开任何需要登录的页面，都会跳转到 Log in，并且不显示缓存的个人数据。

不做社交登录。

---

## 三、添加 CV

```text
打开 CV Manager
  → 没有 CV 时显示空状态
  → 选择 Upload file（PDF / DOCX / TXT，最大 10MB）
     或 Paste text（最多 20,000 字符）
  → 保存
  → 系统解析出经历、项目和技能
  → 回到 CV 列表
```

- 第一份 CV 自动成为 Base CV，也是默认 CV。
- 项目和经历都写在 CV 里，没有单独添加项目的地方。
- Tailored CV 是用户根据某份 Fit Report 自己改好后，另存的版本。
- 列表通过更多操作菜单管理 CV，没有 CV 详情页。
- 文件解析失败时，提示用户改用粘贴文本。

---

## 四、分析 JD

```text
打开 JD Analyzer
  → 粘贴 JD（最多 6,000 字符）
  → 可选：填写 Job URL、公司、职位、地点、工作方式
  → 点击 Analyze JD
  → 显示加载状态
  → 显示分析结果
  → 自动保存为 analyzed job
  → 点击 Create Fit Report 进入下一步
```

分析结果包括：

- 概览：职位、公司、经验级别、地点、工作方式
- 必备技能和加分技能
- 主要职责
- 级别信号和签证担保信息

分析失败时，保留用户粘贴的 JD，可以重试；不能把不完整的结果当作完成显示。

---

## 五、生成 Fit Report

### 创建

```text
打开 Fit Reports → Create Fit Report
  （或从 JD 分析结果点击 Create Fit Report，自动带入岗位）
  → Step 1：选择 analyzed job
  → Step 2：选择 CV（最接近的 CV 标为 Recommended）
  → 点击生成
  → 显示加载状态
  → 打开报告
```

证据只来自所选的 CV。

### 阅读报告

报告从上到下：

| 区域 | 用户能做什么 |
| --- | --- |
| 顶部：分数、推荐标签、一句话总结 | Save to Applications、Download PDF |
| **1 Before you apply**（重点） | 用数字和箭头一条条翻看，完成后点 Mark as done |
| **2 CV suggestions**（重点） | 一条条翻看原文、建议文本、理由和出处；点 Copy 复制，改完 CV 后点 Mark as applied |
| Why this result | 查看强、证据不足、缺失三类各有哪些 |
| Evidence match | 查看 JD 每条要求和 CV 中对应的那句话 |

推荐标签：Apply Now / Tailor First / Low Priority / Not a Fit。

- 系统不会自动改写 CV，用户自己去 CV Manager 修改。
- 报告没有 Role fit 区块。

### 报告列表

在 Fit Reports 列表里可以：

- 搜索
- 按推荐标签筛选
- 排序

每份报告的更多菜单里可以：

- 用另一份 CV 重新生成
- 保存到 Applications
- 下载 PDF
- 分享
- 删除

---

## 六、管理申请

### 保存申请

```text
在 Fit Report 点击 Save to Applications
  （或在 Applications 页面点击 Add application 直接添加）
  → 创建申请，状态为 Saved
  → 出现在 Applications 列表中
```

申请会记住对应的岗位、Fit Report、所用 CV、分数和推荐。

### 申请状态

```text
Saved → Ready to Apply → Applied → Interview → Offer
                                              ↘ Rejected
```

- 用户在申请详情的 Update status 菜单中手动修改状态。
- 每次状态变化都会写入时间线。
- 第一次变为 Applied 时，自动记录投递日期，之后可以修改。

### 申请列表

```text
打开 Applications
  → 查看汇总数量
  → 用状态标签筛选（All 和 6 个状态，带数量）
  → 搜索，或按下一步截止日期排序
  → 点击 Details 打开申请详情
```

每一行显示：

- 岗位和公司
- 状态
- 分数
- 投递日期
- 下一步：逾期的显示红色

### 申请详情

```text
打开一份申请
  → 查看状态、分数、所用 CV、投递日期
  → Next action：当前的 follow-up，可以 Mark done 或 Add follow-up
  → 查看申请信息、关联的 Fit Report、时间线、已完成事项
  → 编辑笔记
```

### 删除申请

- 删除需要用户明确确认。
- 删除后，它的时间线和 follow-up 一起删除，关联的 Fit Report 保留。

---

## 七、Follow-up

### 添加

```text
在申请详情点击 Add follow-up
  → 关联申请已自动带入
  → 从下拉菜单选择动作
  → 选择截止日期
  → 可选：填写备注
  → 保存
  → 显示在申请详情和 Follow-ups 页面
```

| 项目 | 说明 |
| --- | --- |
| 动作 | Check application status / Follow up with recruiter / Prepare for interview / Prepare for assessment / Send thank-you message / Other |
| Other | 选择 Other 时备注必填，用来写具体动作 |
| 截止日期 | 点开月历选择，或点快捷选项 Tomorrow / In 3 days / In 1 week |
| 备注 | 最多 300 字符 |

### 查看和完成

```text
打开 Follow-ups
  （桌面端：左侧导航；手机端：Track 标签里切换到 Follow-ups）
  → 查看汇总：Overdue / Due today / Rest of this week / Done this week
  → 在 Open 标签中按 Overdue / Today / This week / Later 分组查看
  → 点击 Mark done 完成，移到 Completed 标签
  → 需要更多信息时点击 View application
```

- 逾期的事项显示为红色，左侧导航的 Follow-ups 旁显示红色数字。
- 完成后保留完成时间，并写入申请的时间线。
- Follow-ups 页面只用来查看和完成；添加和修改都在申请详情里。
- Dashboard 的 Your next step 和 Needs attention 也会显示即将到期和逾期的 follow-up，可以直接 Mark as done。

---

## 八、共同规则

| 规则 | 说明 |
| --- | --- |
| 必须登录 | Dashboard、CV Manager、JD Analyzer、Fit Reports、Applications、Follow-ups 都需要登录；未登录时跳转到 Log in |
| 只能看自己的数据 | 用户只能读取和修改自己的 CV、分析、报告、申请和 follow-up |
| 不编造 | AI 只能使用用户 CV 中的真实内容，不能编造技能、经历或项目 |
| 缺失就是缺失 | 没有证据的要求必须标为缺失，不能用编造的内容填补 |
| 结果要完整 | AI 输出必须先通过结构校验，才能保存或作为完成的结果显示 |
| 签证信息 | 只作为 JD 信息记录，不构成法律或签证建议 |
| 桌面和手机 | 所有流程在桌面端和手机端都能完成 |
