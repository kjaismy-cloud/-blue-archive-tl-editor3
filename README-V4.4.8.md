# V4.4.8 學生圖片補全版

學生圖片改成候選鏈：

1. `raw.githubusercontent.com/.../student/collection/{ImageId}.webp`
2. `raw.githubusercontent.com/.../student/icon/{ImageId}.webp`
3. `schaledb.com/images/student/icon/{CurrentSlug}.webp`
4. `schaledb.com/images/student/collection/{CurrentSlug}.webp`
5. GitHub Raw slug 版本
6. 最後才顯示姓名縮寫

資料：
- 253 名學生
- 已知 ImageId：131
- CurrentSlug：253
- Boss 完全內嵌：保留
- 中文名稱：保留

已特別套用目前 SchaleDB 頁面可確認的 slug 規則，例如：
- Shizuko -> `shizuko`
- Nodoka (Hot Spring) -> `nodoka_onsen`
- Kotama (Camp) -> `kotama_camp`
- Shizuko (Swimsuit) -> `shizuko_swimsuit`
- Shiroko (Swimsuit) -> `shiroko_swimsuit`

## GitHub Pages 請覆蓋
必須：
- index.html
- sw.js
- students_local.json

raids_local.json 不需要重傳。
