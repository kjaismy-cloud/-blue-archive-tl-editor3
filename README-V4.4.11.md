# V4.4.11 國際服官方名稱版 + 戰術類別

## 名稱規則
- 國際服已實裝：線上 SchaleDB TW 資料載入後，以台港澳繁中 `Name` 為顯示名稱。
- 尚未國際服實裝：保留本地 JP 中文譯名。
- EnglishName 保留，可繼續用英文搜尋。

## 新增戰術類別
篩選器：
- 輸出 (DamageDealer)
- 坦克 (Tanker)
- 輔助 (Supporter)
- 治療 (Healer)

本地 fallback 統計：
- 輸出：174
- 坦克：30
- 輔助：33
- 治療：16
- 未分類：0

線上 SchaleDB TW / JP 資料成功時，`TacticRole` 會用資料庫值覆蓋本地 fallback。

## GitHub Pages 請覆蓋
- index.html
- sw.js
- students_local.json
