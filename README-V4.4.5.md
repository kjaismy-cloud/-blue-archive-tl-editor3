# V4.4.5 Boss 圖片完全內嵌版

Boss 圖片已直接寫進 `index.html` 的 `BOSS_INLINE_IMAGES`。

因此：
- 不讀 SchaleDB Boss 圖片
- 不讀 GitHub Raw Boss 圖片
- 不需要 `boss-icons` 資料夾
- 不受 GitHub Pages 子目錄影響
- 不受 Safari hotlink / CORS 影響
- 離線也能顯示 Boss 圖示

## GitHub Pages 這次只需要覆蓋
- index.html
- sw.js

students_local.json / raids_local.json 不需要重傳，除非你同時想更新資料。
