# HostelBite — Vercel Deployment: Next Steps

Now that Aiven MySQL is hosted and all code modifications are done, here's exactly what to do next.

---

## ✅ What's Already Done (Code Changes)

| Change | Status |
|---|---|
| All `http://localhost:4000` URLs replaced with relative `/api/...` paths | ✅ |
| `src/index.js` sets `axios.defaults.baseURL` from `REACT_APP_API_URL` env var | ✅ |
| `backend/config/Database.js` upgraded from single connection → connection pool with SSL support | ✅ |
| `backend/index.js` updated with dynamic CORS, conditional `app.listen`, and `module.exports = app` | ✅ |
| `vercel.json` created with routing config | ✅ |
| `backend/.env` updated with `DB_PORT`, `DB_SSL`, `FRONTEND_URL` vars | ✅ |

---

## Step 1: Update your local `.env` for Aiven

Open [backend/.env](file:///c:/Users/abhij/Documents/Programming/Project/HostelBite/backend/.env) and replace the local DB values with your Aiven credentials:

```env
DB_HOST=your-aiven-host.aivencloud.com
DB_USER=avnadmin
DB_PASSWORD=your-aiven-password
DB_NAME=HostelBiteDB
DB_PORT=12345            # Your Aiven port (check Aiven dashboard)
DB_SSL=true              # Aiven requires SSL
PORT=4000
JWT_SECRET=your-production-secret
FRONTEND_URL=http://localhost:3000
```

> [!IMPORTANT]
> Test locally first! Run `npm run dev` and verify the app works with the Aiven database before deploying.

---

## Step 2: Push to GitHub

```bash
git add .
git commit -m "feat: prepare for Vercel deployment"
git push origin main
```

> [!WARNING]
> Make sure `backend/.env` is in your `.gitignore` so your secrets are not committed.

---

## Step 3: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and log in
2. Click **"Add New → Project"**
3. Import your GitHub repository (`HostelBite`)
4. Configure:
   - **Framework Preset**: `Create React App`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

---

## Step 4: Set Environment Variables in Vercel

In the Vercel project settings → **Environment Variables**, add ALL of these:

| Variable | Value |
|---|---|
| `DB_HOST` | `your-aiven-host.aivencloud.com` |
| `DB_USER` | `avnadmin` |
| `DB_PASSWORD` | `your-aiven-password` |
| `DB_NAME` | `HostelBiteDB` |
| `DB_PORT` | `12345` (your Aiven port) |
| `DB_SSL` | `true` |
| `JWT_SECRET` | `your-production-secret` |
| `FRONTEND_URL` | `https://your-project.vercel.app` |
| `REACT_APP_API_URL` | `https://your-project.vercel.app` |
| `API_KEY` | `your-razorpay-key` |
| `API_SECRET` | `your-razorpay-secret` |
| `NODE_ENV` | `production` |

> [!TIP]
> After your first deploy, Vercel will assign you a URL like `https://hostelbite.vercel.app`. Come back and update `FRONTEND_URL` and `REACT_APP_API_URL` with this actual URL, then redeploy.

---

## Step 5: Deploy & Verify

1. Click **Deploy** in Vercel
2. Wait for the build to complete
3. Visit your Vercel URL
4. Test login, dashboard, and API calls
5. Check the Vercel **Functions** tab for any backend errors

---

## Troubleshooting

| Issue | Fix |
|---|---|
| CORS errors | Make sure `FRONTEND_URL` in Vercel env vars matches your actual Vercel domain exactly |
| DB connection errors | Verify Aiven credentials and that `DB_SSL=true` is set |
| API calls returning 404 | Check that `vercel.json` routes `/api/*` correctly to `backend/index.js` |
| Cold start delays | Normal on Vercel free tier — first request takes 1-3 seconds |
| 10s timeout errors | Vercel Hobby plan limits functions to 10 seconds |
