# V4.1 更新檔

你目前的 GitHub Pages 不用重建。

請在 Repository 根目錄用 **Upload file** 上傳並覆蓋：

1. `index.html`
2. `sw.js`

如果 GitHub 顯示同名檔案，直接 Commit changes 即可。

更新後：
- Safari 重新整理一次。
- 若仍看到舊版，可關閉分頁後重新開網站。
- 若已「加入主畫面」，完全關閉 Web App 再重新開。

V4.1 修正：
- 學生資料優先從 GitHub Raw 的 SchaleDB `data/tw/students.json` 讀取。
- 不再因 IsReleased 陣列索引差異把學生全部過濾成 0。
- 支援陣列、Student/Students/students 等 JSON 包裝格式。
- 學生頭像改用已驗證的 GitHub Raw `images/student/icon/{Id}.webp`。
- 技能圖示改用已驗證的 GitHub Raw `images/skill/{Icon}.webp`。
- Boss 圖片優先用 `images/raid/Boss_Portrait_{PathName}_Lobby.png`，並支援 IconBG。
- Service Worker 升級為 v4.1，避免 iPhone 長期卡在舊版快取。
