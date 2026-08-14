# V4.4 — 253 名全角色本地資料包

V4.4 把 SchaleDB 目前學生總表的 253 筆角色清單直接打包到 GitHub Pages。

## 必須上傳 / 覆蓋
- index.html
- sw.js
- students_local.json
- raids_local.json

## 行為
- 完全沒有 SchaleDB 遠端 JSON 時，仍會顯示 253 名學生。
- 聖亞與泳裝聖亞在本地清單內。
- 本地資料沒有 STRIKER / SPECIAL 詳細分類時，點角色可手動選「加入 STRIKER」或「加入 SPECIAL」。
- 若 TW / JP 線上資料成功載入，會自動補充角色類型、技能、翻譯等資料。
- 13 個目前 SchaleDB Raid Boss 也在 raids_local.json 中。
