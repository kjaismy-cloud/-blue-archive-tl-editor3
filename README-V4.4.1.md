# V4.4.1 Hotfix

修正 V4.4 啟動錯誤：
`Can't find variable: attachStudentFallback`

原因：V4.4 產生檔案時，頭像備援函式沒有正確保留在最終 index.html。

## GitHub Pages 必須覆蓋
- index.html
- sw.js

students_local.json 與 raids_local.json 若 V4.4 已經上傳，不需要重傳。

V4.4.1 同時更新 Service Worker cache 名稱，避免 iPhone Safari 繼續使用錯誤的 V4.4 index.html。
