# 蔚藍檔案總力戰 TL 編輯器

這個資料夾可以直接部署到 GitHub Pages。

## 最快部署方式

1. 在 GitHub 建立一個新的 repository，例如 `blue-archive-tl-editor`
2. 把這個資料夾內所有檔案上傳到 repository 根目錄
3. 到 GitHub repository 的 **Settings → Pages**
4. 在 **Build and deployment**：
   - Source：`Deploy from a branch`
   - Branch：`main`
   - Folder：`/(root)`
5. 儲存後，GitHub Pages 會提供網站網址

網址通常會是：

`https://你的GitHub帳號.github.io/blue-archive-tl-editor/`

## iPhone 使用

用 Safari 打開 GitHub Pages 網址後：

1. 點 Safari 的「分享」
2. 選「加入主畫面」
3. 之後可以從 iPhone 主畫面直接啟動

網站包含 Web App Manifest 與 Service Worker，因此以 HTTPS 部署後可使用接近 App 的啟動方式。

## 檔案

- `index.html`：網站主程式
- `manifest.webmanifest`：iPhone / PWA 網站資訊
- `sw.js`：基本快取與離線殼層
- `icon-192.png`
- `icon-512.png`
- `apple-touch-icon.png`
- `.nojekyll`：避免 GitHub Pages 對靜態檔案做額外處理

## 資料來源

學生與 Raid 資料會在使用時從 SchaleDB / GitHub raw 備援來源讀取，因此首次開啟需要網路。
