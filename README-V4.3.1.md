# V4.3.1 本地保底同步版

## 修正重點
- 不再等待 SchaleDB 遠端 JSON 才顯示介面。
- 啟動時先載入本地保底學生與 Boss，避免再次出現「0 名學生」。
- 本地資料直接包含：
  - 聖亞
  - 聖亞（泳裝）
  - 一組常用學生保底資料
  - 常見總力戰 Boss
- 之後背景嘗試 TW / JP SchaleDB 線上資料；成功才擴充清單。
- 線上同步失敗時，編輯器仍可正常使用。
- 狀態列會顯示「聖亞 ✓」確認聖亞已載入。
- Service Worker 更新為 ba-tl-v4-3-1，降低 iPhone 舊快取干擾。

## GitHub Pages 更新方式
只需覆蓋：
- index.html
- sw.js

Commit changes 後等 Pages 部署完成，再完全關閉舊 Safari 分頁或主畫面 Web App，重新開啟網站。
