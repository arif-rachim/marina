# Marina

Marina is an experimental low-code web application builder for Node.js, written in mid-2018. Instead of hand-coding a page and an endpoint for every kind of record, you describe a form (its fields, layout and optional server-side hooks) as metadata, and Marina stores that definition in its own database and uses it to serve the matching CRUD screens and a JSON REST API. Every resource is reachable at `/res/:resource`, and a query parameter called `intent` decides whether the response is raw JSON, a generated HTML form, or a paginated HTML grid. Data is stored in embedded NeDB files, so no separate database server is needed. Pages are rendered on the server from JavaScript template-string modules, placed inside a Bootstrap-based admin dashboard theme, and any browser script inside them is bundled and transpiled to ES5 on the fly with Rollup and Babel. It is aimed at developers who want to click together internal data-entry tools, and it remained a personal prototype with no tests.

> Built in 2018. Not actively maintained.

## Features

- **REST resource API**: `GET/POST/PUT/DELETE /res/:resource`, stored in an embedded NeDB database
- **Output types ("intents")**: the same resource can be returned as JSON or as generated `form-html` and `grid-html` pages; `model` and `schema` intents describe a form's fields
- **Form definitions are stored and versioned** in the database (`system_forms`); each record keeps the `_form_version` it was created with
- **Per-form server hooks**: a form definition can carry `beforeRequest` and `afterRequest` JavaScript that runs around inserts and reads of that resource
- **Security**: login and logout, user accounts, roles and session cookies (`svc/security`); pages whose name does not end in `-public` require a session
- A **visual form designer** (`/page/form.design`), including a JavaScript editor field built on Ace
- An **admin dashboard theme** with left-to-right and right-to-left layouts
- ES6 and later code is bundled for the browser with Rollup and Babel

## Tech stack

Node.js · Express 4 · NeDB · cheerio · Rollup + Babel 6 · crypto-js · Ace editor · Bootstrap admin theme (jQuery)

## Getting started

```bash
npm install
npm start        # http://localhost:8000
```

Opening `/` redirects to `/app.html`, the dashboard shell.

Environment variables: `SERVER_PORT` (default `8000`) and `API_SERVER` (default `http://localhost:<SERVER_PORT>`; the server calls its own API through this URL).

Data is written to `.resources/db/<resource>.json` (git-ignored). Seed records for `system_forms`, `system_roles` and `system_user_account` are kept in `script/svc/system/db-init/`; they are not loaded automatically, so copy them into `.resources/db/` to start with the default forms and accounts.

## API

| Route | Purpose |
| --- | --- |
| `GET /res/:resource?intent=json` | List records (paginated) |
| `GET /res/:resource/:id` | One record |
| `GET /res/:resource?$ids=a,b` | Several records by id |
| `POST /res/:resource` | Insert a record |
| `PUT /res/:resource/:id` | Update a record |
| `DELETE /res/:resource/:id` | Delete a record |
| `GET /res/:resource?intent=form-html` / `grid-html` | Generated HTML form or grid (requires login) |
| `GET/POST /svc/:service` | Run a service module; dots map to folders, e.g. `security.login` |
| `GET /page/:page` | Render a page module from `script/page/` |

List query parameters for the JSON intent:

- `$i` (skip, default 0) and `$l` (limit, default 25)
- `$s.<field>=1|-1`: sort by a field
- `$p.<field>=1|0`: projection
- `<field>=value`: case-insensitive regex match; wrap the value in pipes (`|value|`) for an exact match
- `$and=1`: combine field filters with AND instead of the default OR

Responses contain `docs` and `pageInfo` (`totalRecords`, `startingIndex`, `currentPage`, `totalPage` and more).

## Project layout

```text
start.js          Express server & routing
config.js         configuration
script/res/       resource handlers (json, form-html, grid-html, model, schema)
script/svc/       services (security, system, db-init seed data)
script/page/      UI pages, panels and form components
script/common/    shared helpers (pub/sub, polyfills, utils)
app-assets/       dashboard theme assets
```

## How it works

1. A request to `/res/:resource` loads the handler `script/res/<intent>/<method>.js`.
2. The JSON handlers open (or create) an NeDB datastore named after the resource, and run the form's `beforeRequest` / `afterRequest` hook if one exists for the record's form version.
3. HTML intents and `/page/*` routes render template-string modules. `req.print()` lets a template insert async content, and the server waits until all placeholders are filled.
4. Any `<script path="...">` in the rendered HTML is sent to the `system.esnext-es5` service, bundled with Rollup and Babel into an IIFE, and inlined back into the page.
5. `invalidateModuleCache` in `config.js` clears Node's module cache after each page render, so edits to page modules show up without a restart.

## Limitations

- No tests (`npm test` exits with an error).
- The whole project folder is served as static files (`express.static(__dirname)`), and form hooks run arbitrary server-side JavaScript, so it is not safe to expose publicly as-is.
- Passwords are encrypted with a fixed key rather than hashed.
- Uses old toolchain versions (Babel 6, Rollup 0.60). The `repository` URL in `package.json` still points to the old `yallajs/marina` location, which GitHub redirects here.

## License

MIT (as declared in `package.json`)
