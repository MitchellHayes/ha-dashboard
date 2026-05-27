# HA Dashboard

A wall-mounted Home Assistant dashboard built with React, TypeScript, and [@hakit/core](https://shannonhochkins.github.io/ha-component-kit/). Designed for an Echo Show 15 (1920×1080) in the kitchen and the Tesla Model 3 browser (1180×919). Layout is fully fluid using `clamp()` — no fixed canvas.

## Features

- Live room temperatures, occupancy, and light controls for 6 rooms
- Kitchen timer with presets and SVG progress ring
- Media player controls for the kitchen Sonos speaker
- 5-day weather forecast
- Grocery list (real-time sync with HA todo entity)
- Today's calendar events
- Recent door/motion activity feed
- Alarm panel overlay
- Quick actions: all lights off, alarm, front door status

## Setup

```bash
nvm use && npm i
```

Copy `.env.example` to `.env` (or create one) with your values:

```env
VITE_FOLDER_NAME=ha-dashboard
VITE_HA_URL=https://your-ha-instance.com/
VITE_SSH_USERNAME=root
VITE_SSH_PASSWORD=your-ssh-password
VITE_SSH_HOSTNAME=x.x.x.x
```

## Commands

```bash
npm run dev      # local dev server with HMR
npm run build    # typecheck + build (runs prettier first)
npm run deploy   # SSH deploy dist/ to Home Assistant
npm run sync     # pull HA entity types into supported-types.d.ts
npm run lint     # ESLint
```

## Deployment

`npm run deploy` uploads `dist/` to `/config/www/ha-dashboard/` on your HA instance via SSH. The dashboard is then accessible at:

```
{VITE_HA_URL}/local/ha-dashboard/index.html
```

## TypeScript Sync

To get typed entity autocompletion from your live HA instance, add `VITE_HA_TOKEN` to your `.env` (long-lived access token from HA profile settings), then run:

```bash
npm run sync
```

This generates `supported-types.d.ts` — already wired into `tsconfig.app.json`.
