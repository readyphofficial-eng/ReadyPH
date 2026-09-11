# Ready PH Portal — PRD

## Overview
Single-file, pure-frontend teacher-video approval portal. 0 credits (no backend, no DB).
All data in localStorage. Uses GoFile.io for video hosting + ffmpeg.wasm for HD Intro/Outro merge.

## Deliverable
- `/app/index.html` (canonical single file)
- Also served at `/portal.html` via React dev server; `/` auto-redirects to `/portal.html`.

## Architecture
- Vanilla JS + Tailwind CDN + Fredoka Google Font
- LocalStorage keys: `admin_accounts`, `teacher_accounts`, `pending_videos`, `approved_videos`, `branding`
- Session: sessionStorage `rph_session`
- Video upload: GoFile.io (`GET /servers` → `POST /contents/uploadfile`)
- Video merge: ffmpeg.wasm (concat demuxer, `-c copy`)

## Personas
- Main Admin (default `admin` / `readyph2026`)
- Additional Admins (created by admin)
- Teachers (created by admin, tied to a subject)

## Implemented Features (Feb 2026)
- Login selector page (Admin / Teacher big buttons)
- Admin login + Teacher login with error states
- Admin dashboard tabs:
  - Manage Teachers: add/delete, show/hide passwords, total & monthly video counts, filters (All/This Month/Month picker) + search
  - Manage Admins: add/delete (default `admin` protected), password toggle
  - Branding: upload/replace/delete Intro & Outro via GoFile with progress
  - Pending Videos: video cards with Approve/Reject/Download RAW/Download with Intro-Outro, filter by teacher/category/time + search
  - Approved Videos: same downloads + Unapprove
- Teacher dashboard: stats (total + monthly), upload form with progress, My Submissions list
- Download RAW: direct anchor download from GoFile URL
- Download with Intro/Outro: ffmpeg.wasm concat, blob download

## Notes / Known Constraints
- ffmpeg concat `-c copy` requires intro/teacher/outro to share codec+resolution+audio; otherwise re-encode is needed
- GoFile.io `directLink` availability depends on GoFile's current API behavior for anonymous uploads
- All data local to browser only (localStorage) — clearing site data wipes everything

## Backlog (P1/P2)
- Bulk video export / ZIP download
- Import/export localStorage JSON for backup
- Rename / edit teacher & video metadata
- Analytics chart of uploads per month
- Password strength & reset UX
