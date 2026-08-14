# V4.4.16 學生圖片本地補全版

本版延續 V4.4.15 的 253 名學生資料與日服 SquadType / TacticRole 校正。

## 圖片機制
每名學生新增 `LocalImage`：
`student-icons/<學生ID>.webp`

圖片優先順序：
1. GitHub Pages 本地 `student-icons`
2. students_local.json 既有遠端圖片欄位
3. 若全部失敗，顯示繁中姓名縮寫

## 重要
這個版本已建立完整的本地圖片槽位與 fallback 機制，但 ZIP 內不會憑空產生缺少的官方角色圖片。
要達成真正 253/253 全本地圖片，請把學生圖片 ZIP 上傳給 ChatGPT；之後可依學生 ID 自動整理到 `student-icons/`。

GitHub Pages 覆蓋：
- index.html
- sw.js
- students_local.json
- student-icons/（之後放入圖片）
