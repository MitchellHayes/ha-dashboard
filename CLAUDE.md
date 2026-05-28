# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
nvm use && npm i      # first-time setup
npm run dev           # local dev server with HMR
npm run build         # typecheck + vite build (runs prettier first via prebuild)
npm run deploy        # SSH deploy dist/ to Home Assistant
npm run sync          # pull HA entity types into supported-types.d.ts
npm run lint          # ESLint
```

`npm run build` always runs `prettier --write .` first. A build that typechecks clean is required before deploying.

## Architecture

**Stack:** React 19, TypeScript 6, Vite 8, `@hakit/core` v6 + `@hakit/components` v6, Lucide React for icons.

**Entry point:** `src/App.tsx` wraps everything in `<HassConnect>` (WebSocket auth) and `<ThemeProvider>`, then renders `<Dashboard>`.

**Layout (`src/Dashboard.tsx`):** A single full-viewport grid with two rows:
- `NowStrip` — clock, weather, presence/next-event strip (three-column, auto height)
- `pulse-main` — three columns: left (ForecastCard / TabbedListCard / ActivityCard), center (HouseOverview 3×2 room grid), right (ClimateCard / AlarmCard / MediaCard)

`AlarmCard` manages its own `panelOpen` state; tapping the state indicator renders `AlarmPanel` as an absolute-positioned overlay for door/window sensor details.

**Responsive sizing:** The layout uses `clamp()` throughout — no fixed 1920×1080 canvas. Grid column widths, row heights, padding, and large display font sizes all clamp between a Tesla-viewport minimum (~1180px) and Echo Show maximum (1920px). CSS vars for display fonts: `--sz-clock`, `--sz-weather-temp`, `--sz-room-temp`, `--sz-timer`.

## HAKit API Patterns

These are non-obvious and must be followed exactly:

**Entity subscription:**
```ts
const entity = useEntity('light.kitchen_main_lights_1');
entity.state          // 'on' | 'off' | ...
entity.attributes     // typed per domain
entity.last_changed   // ISO string
```

**Service calls — always use the `serviceData` wrapper:**
```ts
// ✅ correct
entity.service.volumeSet({ serviceData: { volume_level: 0.5 } });
entity.service.toggle();   // no-arg calls are fine without wrapper

// ❌ wrong — will silently fail or error
entity.service.volumeSet({ volume_level: 0.5 });
```

**`todo` and `calendar` domains are not in HAKit's typed domain set.** Use the `AnyCall` cast from `useTodoItems.ts`:
```ts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyCall = (args: Record<string, unknown>) => Promise<any>;
const callService = useHass(s => s.helpers.callService) as unknown as AnyCall;
```

**Weather:**
```ts
const weather = useWeather('weather.openweathermap', { type: 'daily' });
weather.forecast?.forecast   // daily forecast array
weather.attributes?.temperature  // current temp
```

**Watching entity state for real-time hook updates:**
```ts
const entityState = useHass(s => (s.entities as Record<string, { state: string }>)[entityId]?.state);
useEffect(() => { void fetch(); }, [entityState, fetch]);
```

## Design System

All tokens live in `src/index.css` as CSS custom properties. Key ones:
- Colors: `--bg`, `--bg-deep`, `--card`, `--card-2`, `--border`, `--text`, `--text-2`, `--text-3`, `--accent` (#ffbf47 amber), `--accent-2`, `--ok` (green), `--alert` (red), `--cool` (blue), `--warm`
- Typography: `--font` (Geist), `--mono` (Geist Mono)
- Shape: `--radius` (20px), `--radius-md`, `--radius-sm`
- Display font sizes: `--sz-clock`, `--sz-weather-temp`, `--sz-room-temp`

Utility classes: `.card`, `.room`, `.ibtn`, `.ibtn.sm`, `.ibtn.primary`, `.switch`, `.switch.on`, `.dot`, `.dot.live`, `.pill`, `.pill.on`, `.slider`, `.mono`, `.label`, `.card-title`, `.card-action`, `.card-h`, `.col`, `.col-flex`, `.grow`, `.between`, `.divider`

Icon library is **Lucide React** (stroke-based). Use `strokeWidth={1.5}` for regular icons, `1.2–1.4` for decorative/large ones.

## HA Entity Map

| Purpose | Entity ID |
|---|---|
| Weather | `weather.openweathermap` |
| Alarm | `alarm_control_panel.alarm_control_panel` |
| Shopping list | `todo.shopping_list` |
| Family calendar | `calendar.family_calendar` |
| Kitchen speaker | `media_player.kitchen_speaker_2` |
| Kitchen group light | `light.kitchen_and_dining_room_lights` |
| Persons | `person.mitchell`, `person.michelle`, `person.ryan` |
| Dog tracker | `device_tracker.takumi_tracker` |
| Front/back door | `binary_sensor.front_door_entry`, `binary_sensor.back_door_entry` |
| Garage / patio | `binary_sensor.garage_entry`, `binary_sensor.patio_window_entry` |
| Sunset sensor | `sensor.sun_next_setting` |
| Thermostat | `climate.thermostat` (modes: heat\_cool / heat / cool / off; single setpoint in heat/cool, high+low range in heat\_cool) |

Room entity mappings are in `src/components/HouseOverview.tsx` in the `ROOMS` array.

## Deployment

`npm run deploy` SSHs into the HA instance and uploads `dist/` to `/config/www/ha-dashboard/`. Credentials come entirely from `.env` (gitignored). The dashboard is served at `{VITE_HA_URL}/local/ha-dashboard/index.html`.

Target displays: Echo Show 15 (1920×1080, wall-mounted kitchen) and Tesla Model 3 browser (~1180×919).
