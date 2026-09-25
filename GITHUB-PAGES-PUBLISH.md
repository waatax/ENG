# 發佈到 `waatax.github.io/ENG`

網站成品位於 `site/`。它使用 `site/dist/` 作為 GitHub Pages 的靜態根目錄，已附上 `site/.github/workflows/pages.yml`。

若 GitHub 儲存庫 `waatax/ENG` 的內容是這個 `site/` 目錄，推送到 `main` 後，GitHub Actions 會自動部署；儲存庫設定的 Pages source 要選 GitHub Actions。預期網址為：

`https://waatax.github.io/ENG/`

在可連線且已登入 GitHub 的環境執行：

```powershell
git clone https://github.com/waatax/ENG.git
cd ENG
Copy-Item -Recurse -Force "C:\Users\User\OneDrive\文件\Antigravity\ENG\site\*" .
git add .
git commit -m "Deploy English Quest learning platform"
git push origin main
```

推送前請確認 `data/sources/private/` 沒有被複製到儲存庫；那些官方原卷目前只在私有校對區。若要把目前工作區保留在 GitHub 文件中，將根目錄的計畫書另行複製到儲存庫，但不要把私有 PDF 放入公開 Pages 來源。

這次環境尚未成功推送，因此不把網址標記為已上線。發佈後請確認首頁、`sources.json`、能力路線、章節頁和官方資源連結都能讀取。
