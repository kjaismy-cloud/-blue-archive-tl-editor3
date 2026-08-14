# V4.5.5 啟動錯誤修正版

修正手機畫面錯誤：
Can't find variable: BOSS_INLINE_IMAGES

V4.5.5 在 JavaScript 最前方建立 BOSS_INLINE_IMAGES，
避免 Boss 圖片 fallback 邏輯讓整個 App 在 renderStudents 前中止。

保留：
- 253 名學生資料內嵌
- 手機學生選擇
- STRIKER 4 + SPECIAL 2
- Boss / TL 功能

GitHub Pages 覆蓋 index.html 與 sw.js。
