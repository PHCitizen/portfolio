Welcome to your new TanStack Start app!

# Getting Started

To run this application:

```bash
pnpm install
pnpm dev
```

# Building For Production

To build this application for production:

```bash
pnpm build
```

## Styling

This project uses [Tailwind CSS](https://tailwindcss.com/) for styling.

### Removing Tailwind CSS

If you prefer not to use Tailwind CSS:

1. Remove the demo pages in `src/routes/demo/`
2. Replace the Tailwind import in `src/styles.css` with your own styles
3. Remove `tailwindcss()` from the plugins array in `vite.config.ts`
4. Remove `@tailwindcss/vite` and `tailwindcss` from `package.json`

## Linting & Formatting

This project uses [Biome](https://biomejs.dev/) for linting and formatting. The following scripts are available:


```bash
pnpm lint
pnpm format
pnpm check
```

### Pre-commit formatting

After `pnpm install`, enable the versioned Git hook from the repository root:

```bash
git config --local core.hooksPath .githooks
```

On commit, the hook runs `pnpm biome format --write` on staged files that Biome supports and stages the formatting changes. Unstaged edits are kept out of the commit. If they cannot be restored cleanly after formatting, the hook stops the commit and restores the original changes.

## Deploy to Cloudflare Pages (legacy)

The Pages build uses Nitro's `cloudflare-pages` preset for server-side rendering. Wrangler uploads `dist/` to the Pages project `jayveeembog` (not a standalone Workers deployment).

Use Node.js 22.12+ and install dependencies with `pnpm install --frozen-lockfile`. To build and test locally:

```bash
pnpm build:pages
pnpm preview:pages
```

Authenticate with `pnpm exec wrangler login`. In CI, supply `CLOUDFLARE_ACCOUNT_ID` and a `CLOUDFLARE_API_TOKEN` with Account → Cloudflare Pages → Edit access as secrets instead.

If the Pages project does not exist, create it once with `master` as the production branch:

```bash
pnpm exec wrangler pages project create jayveeembog --production-branch master
```

Then deploy to production:

```bash
pnpm deploy:pages
```

The intended production URL is https://jayveeembog.pages.dev. If the project already exists, confirm its production branch is `master` before deploying; a different branch produces a preview deployment.

### Enable the Telegram contact form

1. Create a **Managed** widget in Cloudflare Turnstile and allow every hostname that will serve the form (for example, `jayveeembog.pages.dev` and your custom domain).
2. Put `VITE_TURNSTILE_SITE_KEY=<your widget site key>` in a local `.env` file, or set it in your build environment. This is the **public** key: Vite reads it when you run `pnpm build:pages`. When using `pnpm deploy:pages` from your machine, a Pages dashboard variable alone won’t reach that local build.
3. Create a Telegram bot with `@BotFather`. In Telegram, open the bot’s chat and press **Start** before testing delivery. Get your destination chat ID from an update sent to your bot (via Telegram’s `getUpdates` API, keeping the token private).
4. In **Workers & Pages → jayveeembog → Settings → Variables and Secrets**, add these **runtime secrets** to the environment you’re deploying to (Production or Preview):

   | Secret | Value |
   | --- | --- |
   | `TURNSTILE_SECRET_KEY` | The private key for the same Turnstile widget |
   | `TELEGRAM_BOT_TOKEN` | The token from `@BotFather` |
   | `TELEGRAM_CHAT_ID` | The destination Telegram chat ID |

   Do not prefix these with `VITE_`, commit them, or use them in client code. The `/api/contact` endpoint runs in the existing Pages worker, so there’s no separate Function to deploy.
5. Run `pnpm deploy:pages` and send a test message from the live site. Confirm it arrives in Telegram and includes the sender’s email.

For local Pages testing, put the three runtime secrets in an untracked `.dev.vars` file in the project root and run `pnpm build:pages` then `pnpm preview:pages`. Use a development widget that permits your local hostname and a test Telegram chat. The server checks that the verified Turnstile token was issued for the hostname receiving the submission. If the public key isn’t configured, the site keeps the existing email option available and reports the form as unavailable.

## Deploy with Nitro to Node.js

This project uses Nitro as a generic server adapter, so it can run on any Node-compatible host.

```bash
npm run build
node .output/server/index.mjs
```

The build output is a self-contained Node server. To deploy, push the `.output/` directory to your host (Render, Fly.io, your own VPS, etc.) and run the server command above.

For host-specific presets (Vercel, Netlify, Cloudflare, AWS Lambda, etc.) and tuning, see https://v3.nitro.build/deploy.



## Routing

This project uses [TanStack Router](https://tanstack.com/router) with file-based routing. Routes are managed as files in `src/routes`.

### Adding A Route

To add a new route to your application just add a new file in the `./src/routes` directory.

TanStack will automatically generate the content of the route file for you.

Now that you have two routes you can use a `Link` component to navigate between them.

### Adding Links

To use SPA (Single Page Application) navigation you will need to import the `Link` component from `@tanstack/react-router`.

```tsx
import { Link } from "@tanstack/react-router";
```

Then anywhere in your JSX you can use it like so:

```tsx
<Link to="/about">About</Link>
```

This will create a link that will navigate to the `/about` route.

More information on the `Link` component can be found in the [Link documentation](https://tanstack.com/router/v1/docs/framework/react/api/router/linkComponent).

### Using A Layout

In the File Based Routing setup the layout is located in `src/routes/__root.tsx`. Anything you add to the root route will appear in all the routes. The route content will appear in the JSX where you render `{children}` in the `shellComponent`.

Here is an example layout that includes a header:

```tsx
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'My App' },
    ],
  }),
  shellComponent: ({ children }) => (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <header>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
          </nav>
        </header>
        {children}
        <Scripts />
      </body>
    </html>
  ),
})
```

More information on layouts can be found in the [Layouts documentation](https://tanstack.com/router/latest/docs/framework/react/guide/routing-concepts#layouts).

## Server Functions

TanStack Start provides server functions that allow you to write server-side code that seamlessly integrates with your client components.

```tsx
import { createServerFn } from '@tanstack/react-start'

const getServerTime = createServerFn({
  method: 'GET',
}).handler(async () => {
  return new Date().toISOString()
})

// Use in a component
function MyComponent() {
  const [time, setTime] = useState('')
  
  useEffect(() => {
    getServerTime().then(setTime)
  }, [])
  
  return <div>Server time: {time}</div>
}
```

## API Routes

You can create API routes by using the `server` property in your route definitions:

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'

export const Route = createFileRoute('/api/hello')({
  server: {
    handlers: {
      GET: () => json({ message: 'Hello, World!' }),
    },
  },
})
```

## Data Fetching

There are multiple ways to fetch data in your application. You can use TanStack Query to fetch data from a server. But you can also use the `loader` functionality built into TanStack Router to load the data for a route before it's rendered.

For example:

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/people')({
  loader: async () => {
    const response = await fetch('https://swapi.dev/api/people')
    return response.json()
  },
  component: PeopleComponent,
})

function PeopleComponent() {
  const data = Route.useLoaderData()
  return (
    <ul>
      {data.results.map((person) => (
        <li key={person.name}>{person.name}</li>
      ))}
    </ul>
  )
}
```

Loaders simplify your data fetching logic dramatically. Check out more information in the [Loader documentation](https://tanstack.com/router/latest/docs/framework/react/guide/data-loading#loader-parameters).


# Demo files

Files prefixed with `demo` can be safely deleted. They are there to provide a starting point for you to play around with the features you've installed.


# Learn More

You can learn more about all of the offerings from TanStack in the [TanStack documentation](https://tanstack.com).

For TanStack Start specific documentation, visit [TanStack Start](https://tanstack.com/start).
