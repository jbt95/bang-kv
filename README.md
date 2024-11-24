## Prerequisites

Before running the script, ensure you have the following:

- **Node.js** installed on your machine (version 14 or higher recommended).
- **npm** (Node Package Manager) is included with Node.js.
- Access to a Cloudflare account with KV storage enabled.

## Environment Variables

The script requires three environment variables to be set:

- `ACCOUNT_ID`: Your Cloudflare account ID.
- `NAMESPACE_ID`: The ID of the KV namespace you wish to purge.
- `CLOUDFLARE_API_TOKEN`: A Cloudflare API token with permissions to access KV storage.

You can set these variables in your terminal session or include them in a `.env` file if you are using a package like `dotenv`.

## Installation
```
pnpm i
```

## Usage
```
ACCOUNT_ID=<accountId> NAMESPACE_ID=<namespaceId> CLOUDFLARE_API_TOKEN=<apiToken> npx bang
```
