# V4.4.2 圖片修正版

## 修正
- V4.4 / V4.4.1 的本地學生使用虛擬 ID，導致圖片網址全部錯誤。
- 現在改用 SchaleDB 已公開的角色圖片 ID 對照。
- 已成功綁定 131 名學生到真實圖片 ID。
- 已綁定角色使用：
  `images/student/collection/{ImageId}.webp`
- 角色圖片載入失敗時再嘗試：
  `images/student/icon/{ImageId}.webp`
- 新角色若尚未出現在舊 ID 表，會嘗試現行 SchaleDB slug 圖片，最後才顯示文字縮寫。
- Boss 使用固定 `ImageSlug`，優先：
  `images/raid/Boss_Portrait_{ImageSlug}_Lobby.png`

## GitHub Pages 必須覆蓋
這次請上傳 4 個檔案：
- index.html
- sw.js
- students_local.json
- raids_local.json

原因是 students_local.json 和 raids_local.json 新增了真正圖片 ID / ImageSlug。
