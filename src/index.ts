import assert from 'assert'
import Cloudflare from 'cloudflare'
import { bufferCount, defer, EMPTY, expand, lastValueFrom, map, mergeMap, tap, toArray } from 'rxjs'

const BATCH_SIZE = 10_000

async function purge() {
  const ACCOUNT_ID = process.env.ACCOUNT_ID
  const namespaceId = process.env.NAMESPACE_ID
  const apiKey = process.env.CLOUDFLARE_API_TOKEN

  assert.ok(ACCOUNT_ID, 'ACCOUNT_ID is not set in env')
  assert.ok(namespaceId, 'NAMESPACE_ID is not set in env')
  assert.ok(apiKey, 'CLOUDFLARE_API_TOKEN is not set in env')

  const cloudflare = new Cloudflare({ apiKey })

  console.log(`Fetching keys from namespace ${namespaceId}...`)

  return lastValueFrom(
    defer(() =>
      cloudflare.kv.namespaces.keys
        .list(namespaceId, { account_id: ACCOUNT_ID })
        .then(res => [res.result_info, res.result] as const),
    ).pipe(
      expand(([info]) =>
        info.cursor
          ? cloudflare.kv.namespaces.keys
              .list(namespaceId, {
                account_id: ACCOUNT_ID,
                cursor: info.cursor,
              })
              .then(res => [res.result_info, res.result] as const)
          : EMPTY,
      ),
      mergeMap(([, data]) => data),
      map(k => k.name),
      bufferCount(BATCH_SIZE),
      tap(keys => console.log(`Deleting batch ${keys.length}...`)),
      mergeMap(keys =>
        defer(() =>
          cloudflare.kv.namespaces.bulk.delete(
            namespaceId,
            { account_id: ACCOUNT_ID },
            { body: keys },
          ),
        ).pipe(tap(() => console.log(`Deleted batch`))),
      ),
      toArray(),
    ),
  )
}

purge()
  .then(() => console.log('Done!'))
  .catch(e => console.error(e))
