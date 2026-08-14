# V4.4.3 Boss 圖片修正版

Boss 官方圖片在部分 iPhone Safari / GitHub Pages 環境仍無法 hotlink，
所以 V4.4.3 改成：

1. 先嘗試 SchaleDB 官方 Boss 圖片。
2. 若遠端圖片失敗，自動使用網站內建的本地 Boss SVG 圖示。
3. 本地 Boss 圖示會被 Service Worker 快取，離線也會顯示。

## 這次請上傳 / 覆蓋
- index.html
- sw.js
- raids_local.json
- 整個 `boss-icons` 資料夾

`students_local.json` 若你已經是 V4.4.2，可不必重傳。

重點：這一次一定要把 `boss-icons` 資料夾上傳，否則本地保底 Boss 圖片不存在。
