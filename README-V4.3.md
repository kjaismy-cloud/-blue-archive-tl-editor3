# V4.3 SchaleDB 全角色同步版

## 新功能
- 同時讀取 SchaleDB TW 與 JP 學生資料。
- TW 資料優先使用繁中名稱與資料。
- TW 沒有的角色由 JP 學生資料自動補齊。
- 新增學生篩選：全部角色 / 國際服 / 日服。
- 狀態列會顯示總角色數、國際服數量、JP 補充數量。
- 會額外檢查「聖亞」是否成功進入角色清單。
- 學生頭像與技能圖示：SchaleDB 現行站點優先、GitHub Raw 備援。
- 保留 V4.2 的 STRIKER 4 + SPECIAL 2、同頁選角與 TL 功能。

## 更新方式
GitHub Pages 不需重建，只覆蓋：
- index.html
- sw.js

Commit changes 後等 Pages 重新部署，再關閉舊 Safari 分頁並重新開網站。
