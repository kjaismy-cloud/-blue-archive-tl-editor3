# V4.4.6 學生資料修正版

## 這次完整修正
- Boss 完全內嵌圖片：保留 V4.4.5。
- 253 名學生：保留本地 `students_local.json`。
- 學生繁中名稱：保留 V4.4.4。
- 學生圖片 fallback：重新實作。
- `attachStudentFallback`：完全移除。

### 靜態檢查結果
- 舊 `attachStudentFallback` 定義：0
- 舊 `attachStudentFallback` 呼叫：0
- 新 `setupStudentImageFallback` 定義：1
- 新 helper 呼叫位置：2
- 本地學生數：253
- 聖亞：存在

## GitHub Pages 請覆蓋
必須：
- index.html
- sw.js

建議同步覆蓋：
- students_local.json
- raids_local.json

更新後請完全關閉 Safari 舊分頁，再重新開網站。
