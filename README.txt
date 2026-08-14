蔚藍檔案總力戰 TL 編輯器 V4.5.25

新增 Cloudflare KV 雲端時間軸：
- 儲存後產生 8 碼短代碼與分享網址。
- 輸入短代碼或開啟分享網址即可載入。
- Pages Functions 的 KV 綁定名稱必須設為 TL_STORE。

Cloudflare 設定：Workers & Pages → 專案 → Settings → Bindings → Add → KV namespace，Variable name 輸入 TL_STORE，選擇建立好的 KV namespace，儲存後重新部署。
