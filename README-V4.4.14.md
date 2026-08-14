# V4.4.14 日服資料全校正版

## 資料準則
所有戰鬥資料以 SchaleDB 日服為準：

- STRIKER / SPECIAL → JP
- 戰術類別 → JP
- Skills → JP
- SkillType → JP
- COST → JP

TW/Global 只做繁中本地化：
- 學生名稱
- 技能名稱（有對應時）

JP-only：
- 學生名稱使用本地繁中譯名
- 技能數值、技能類型、COST 仍使用 JP
- 沒有繁中技能名時顯示「EX技能／基本技能／強化技能／子技能」，避免把日文當主顯示名

## 完整度檢查
狀態列會顯示：
- 學生總數
- 名稱完整度
- STRIKER/SPECIAL 完整度
- 戰術類別完整度
- 技能完整度
- JP位置來源數
- JP戰術來源數
- JP技能來源數
- 鹿江 ✓/✗

## 重要
如果 SchaleDB JP JSON 被 Safari / CORS 擋住，會清楚顯示「日服同步失敗」，
並保留本地資料可繼續操作，不再把本地 fallback 假裝成已完整校驗的 JP 資料。

## GitHub Pages 請覆蓋
- index.html
- sw.js
- students_local.json
