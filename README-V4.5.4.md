# V4.5.4 253學生強制內嵌版

真正問題已確認：
V4.5.3 不只是 students_local.json 沒讀到，
前幾版合併後 `loadLocalCatalog`、`mergeStudentCatalog`、`releasedTW`、`setStatus`
等啟動函式也遺失，因此畫面只能得到 0 / 0。

V4.5.4：
- 253 名學生完整資料直接內嵌在 index.html
- Boss 資料也直接內嵌
- 啟動時直接 students = EMBEDDED_STUDENTS
- 不依賴 students_local.json 才能顯示學生
- 暫時停用遠端 JP/TW 同步，先確保編隊功能百分之百可用
- 沒圖片仍然能選學生
- iPhone / Chrome 桌面共用同一份內嵌資料
- JavaScript 已通過 node --check

GitHub Pages 只要覆蓋：
- index.html
- sw.js

這版即使 students_local.json 完全不存在，也應顯示 253 / 253 名學生。
