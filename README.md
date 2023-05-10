# Shieldmaiden

A simple AF CMS, with few dependancies.

## Requirements

- Node 18+

## What is this for?

So you specify a JSON schema, which it uses for a dynamic admin.
This is gonna let you CRUD posts, stored then as JSON and saved, like, posted to the git repo, right?

Purely a CMS. No notion of how you'd then use the data, just straight up posts CRUDable and schema-able however you need.

## Plan

- NPM package to run local CMS within your site
- Schema Editor
- JSON Editor
- Injectable stuff depending on schema, based on plugin packages shieldmaiden/imdb
- Git push JSON from UI
- Image upload (to local assets) and reference

## Future

Move CMS to cloud functions or just a github logged in thing. NetlifyCMS manages it somehow

## DEV

Develop here, but from the context of ../shieldmaiden-example, by running

    npm run dev-example

## TODO

- `_headers` (in parent dir) needs instruction/injection. Like, added to users' site, with a specific origin ideally

## Stream of consciousness - JSON Editor

Minimal requirements:

- SCHEMA injection
- Feature injection, e.g. imdb
- Bracket grouping
- Validation

No matter how I slice it, editing raw JSON is pretty uncomfortable

Maximal requirements

- HTML preview
- Post filtering / CRUD

## Lists to create with it

- Projects
- Youtube channels for (rare) video essays, e.g. broey, jenny, ..
- Depression hacks (snail mail audiotree, coding, because i'm good at it)
- Words to say more: "Bogus"
