# Logic Nest Learning Hub — one-time setup

The Learning Hub is now connected to Supabase and GitHub Pages. The public pages never receive admin-only keys.

## 1. Supabase Edge Function secret

In Supabase Dashboard → Edge Functions → Secrets, add:

`YOUTUBE_API_KEY`

Use a YouTube Data API v3 key with access to the playlist/video endpoints used by `learning-youtube-sync`.

## 2. GitHub Actions secret

In GitHub → Settings → Secrets and variables → Actions, add:

`SUPABASE_SERVICE_ROLE_KEY`

The scheduled workflow uses this secret only server-side to call the synchronization Edge Function. Do not place it in any HTML or JavaScript file.

## 3. Use the Learning Manager

Open:

`admin.html` → `Learning Hub` → `Courses`

Create a course, paste the YouTube playlist URL/ID, save it, then use `Sync YouTube` to import the playlist into lessons.

## 4. Publishing flow

Course status controls public course visibility. Lesson visibility controls individual lesson visibility. Notes are uploaded to the private `learning-notes` bucket and public lesson pages receive signed URLs only after the published-content check.

## 5. Automatic synchronization

`.github/workflows/youtube-learning-sync.yml` runs every six hours and can also be started manually from the Actions tab.

No YouTube API key or Supabase service-role key is included in the public site.
