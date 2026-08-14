# V4.4.4 全中文修正版

## 修正
- 修復 `Can't find variable: attachStudentFallback`
- 已確認 index.html 內：
  - attachStudentFallback 定義：1
  - 呼叫位置：5
- 253 名學生的 Name 全部改成中文顯示名。
- EnglishName 保留，所以可搜尋「伊織」或 `Iori`。
- 服裝版本統一使用繁中括號，例如：
  - 聖亞（泳裝）
  - 陽奈（禮服）
  - 優香（體育服）
  - 白子＊TERROR
- 線上 JP/TW 資料補充時，不再把本地中文名稱覆蓋回英文。
- 保留 V4.4.3 的 Boss 本地圖片保底與學生圖片 fallback。

## GitHub Pages 這次請覆蓋
必須：
- index.html
- sw.js
- students_local.json

建議一併覆蓋：
- raids_local.json

如果你已經上傳 V4.4.3 的 `boss-icons` 資料夾，不需要重傳。
