# Marina

A low-code web application builder that runs on Node.js. You define forms and data models as metadata. Marina then generates the CRUD pages (forms and grids) and a JSON REST API for them, all inside an admin dashboard.

> Built in 2018. Not actively maintained.

## Features

- **REST resource API**: `GET/POST/PUT/DELETE /res/:resource`, stored in an embedded NeDB database
- **Output types ("intents")**: the same resource can be returned as JSON or as generated `form-html` and `grid-html` pages
- **Form definitions are stored and versioned** in the database (`system_forms`)
- **Security**: login and logout, user accounts, roles and session cookies (`svc/security`)
- A **visual form designer**, including a JavaScript editor field built on Ace
- An **admin dashboard theme** with left-to-right and right-to-left layouts
- ES6 and later code is bundled for the browser with Rollup and Babel

## Getting started

```bash
npm install
npm start        # http://localhost:8000
```

Environment variables: `SERVER_PORT` (default `8000`) and `API_SERVER`.

## Project layout

```
start.js          Express server & routing
config.js         configuration
script/res/       resource handlers (json, form-html, grid-html, model, schema)
script/svc/       services (security, system, db-init seed data)
script/page/      UI pages, panels and form components
app-assets/       dashboard theme assets
```
