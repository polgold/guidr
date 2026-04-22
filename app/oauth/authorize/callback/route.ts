import { NextRequest } from 'next/server'
import { createAuthorizeCallbackHandler } from '@exitmcp/auth-oauth'
import { UpstashKVStore } from '@exitmcp/kv-upstash'
import { MemoryKV } from '@exitmcp/core'
import siteConfig from '../../../../exitmcp.config'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function kv() {
  if (process.env.UPSTASH_REDIS_REST_URL) return new UpstashKVStore({ namespace: 'exitmcp' })
  return new MemoryKV()
}

const handler = createAuthorizeCallbackHandler({
  kv: kv(),
  site: { name: siteConfig.name, github: siteConfig.github },
})

export async function GET(req: NextRequest) { return handler(req) }
