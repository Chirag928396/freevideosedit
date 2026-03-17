# Deploy to Hostinger - GitHub Actions Template

Copy this file to `.github/workflows/deploy.yml` in any repo you want to auto-deploy.
Change the values marked with `# <-- CHANGE THIS` for each repo.

---

```yaml
name: Deploy to Hostinger

on:
  push:
    branches:
      - main        # <-- CHANGE THIS if your branch is different (e.g. master)

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy via SSH
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USER }}
          password: ${{ secrets.SSH_PASSWORD }}
          port: ${{ secrets.SSH_PORT }}
          script: |
            source ~/.nvm/nvm.sh 2>/dev/null || true
            cd /var/www/YOUR_FOLDER_NAME   # <-- CHANGE THIS (e.g. /var/www/backend_convertall)
            git pull origin main           # <-- CHANGE THIS if branch is different
            npm install
            npm run build                  # <-- REMOVE THIS if no build step needed
            pm2 restart YOUR_PM2_APP_NAME  # <-- CHANGE THIS (e.g. convertall-backend)
            echo "Deployment complete"
```

---

## Setup Steps (do this once per repo on GitHub)

1. Go to your GitHub repo → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret** and add these 4 secrets:

   | Secret Name    | Value                  |
   |----------------|------------------------|
   | `SSH_HOST`     | `31.97.63.87`          |
   | `SSH_USER`     | `root`                 |
   | `SSH_PASSWORD` | *(your SSH password)*  |
   | `SSH_PORT`     | `22`                   |

3. Commit and push the `deploy.yml` file to your repo.
4. Every `git push` to `main` will now **automatically deploy** to Hostinger.

---

## Your Current Sites

| PM2 App Name              | Folder                         | Repo                              |
|---------------------------|--------------------------------|-----------------------------------|
| `freevideosedit-frontend` | `/var/www/freevideosedit-frontend` | `Chirag928396/freevideosedit`  |
| `convertall-backend`      | `/var/www/backend_convertall`      | `Digpalk/backend_convertall`  |
| `frontend`                | `/var/www/frontend_convertAll`     | `Digpalk/frontend_convertAll` |
