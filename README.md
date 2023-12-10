# Ajeer Partners

# vue

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates.

However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can run `Volar: Switch TS Plugin on/off` from VS Code command palette.

## Requirements

* nodejs v20.x .
* pnpm 8.12.x .
* vite 4.4.x .
* vuetify 3.3.x .


## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm run dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm run build
```

## Deployment

some notes about deployment .

#### Deploy in stag
```sh
pm2 start ecosystem.config.js --only ajeer-partners-stg --watch
```

#### Deploy in production
```sh
pm2 start ecosystem.config.js --only ajeer-partners-prod --watch
```

while the "ajeer-pwa-prod" is the app name in ecosystem.config.js file, you can change it to any name you want.


Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
