# V4.5.1 Chrome 桌面熱修版

V4.5 的問題：
桌面版程式原本嘗試把三欄容器插到 `</header>` / `<main>`，
但實際 index.html 沒有這兩個元素，因此 desktopLayout 根本沒被建立。
同時桌面 CSS 又隱藏底部導覽，造成學生頁看起來整個消失。

V4.5.1：
- desktopLayout 直接插在實際存在的 `viewBoss` 前
- Chrome >= 980px 顯示真正三欄
- 左：Boss + 隊伍
- 中：學生搜尋/篩選/詳細資料
- 右：TL
- 移動 DOM 後強制重新 renderBosses/renderTeam/renderStudents/renderTl
- iPhone < 980px 保持原手機版
- JavaScript 已用 node --check 驗證

GitHub Pages 覆蓋：
- index.html
- sw.js
