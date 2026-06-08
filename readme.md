# mtg.reroll.in

> [!WARNING]
> **Deprecated — no longer maintained or deployed.**
> Automatic deployments are disabled (see [`vercel.json`](vercel.json)) and the
> build no longer fetches the live events feed; it renders a static fallback
> only. This repository is kept for archival reference.

Front-end for MTG Reroll's event listing. Displayed upcoming Magic: The Gathering events in Bangalore.

No backend — events were consumed from a JSON feed at build time.

## Dev

```bash
npm install
npm run dev    # local server
npm run build  # one-off build
```
