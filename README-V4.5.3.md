# V4.5.3 手機學生資料顯示修正版

真正問題：
V4.5.2 的學生列表基礎資料使用 `students.filter(releasedTW)`，
所以本地 253 名學生即使載入成功，也可能因缺少國際服 release metadata 而被全部濾掉。

V4.5.3：
- `renderStudents()` 改成以完整 `students.slice()` 為基礎
- 預設顯示全部角色
- 國際服 / JP 只有在使用者主動選篩選器時才過濾
- 手機載入後自動重新 renderStudents
- 篩選結果 0 時會顯示提示
- 沒有學生圖片仍然可以正常選學生

GitHub Pages 請覆蓋：
- index.html
- sw.js

students_local.json 若已是 253 名版本，不需要重傳。
