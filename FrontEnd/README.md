# Tech Hub Store (React + Vite)

Modern e-commerce UI for technology peripherals with category filtering, sticky navigation, product grids, and admin-only discount sections.

## Admin Access
- Username: `admin`
- Password: `1234`
- Password is validated by hash comparison (`src/utils/auth.js`), not plain-text storage.

## Run
```bash
npm run dev
```

If `node_modules` was deleted, `dev/build/lint/preview` now auto-runs `npm ci` before continuing.

## Build
```bash
npm run build
```

## Safe `node_modules` Reinstall
You can delete `node_modules` at any time. To restore everything without breaking Vite:

```bash
npm run reinstall
```

or run and start in one command:

```bash
npm run reinstall:dev
```

These commands use `package-lock.json` to recreate the exact dependency tree.

