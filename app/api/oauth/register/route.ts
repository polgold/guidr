import { NextRequest } from 'next/server'
import { createRegisterHandler } from '@exitmcp/auth-oauth'
import { UpstashKVStore } from '@exitmcp/kv-upstash'
import { MemoryKV } from '@exitmcp/core'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function kv() {
  if (process.env.UPSTASH_REDIS_REST_URL) return new UpstashKVStore({ namespace: 'exitmcp' })
  return new MemoryKV()
}

const handler = createRegisterHandler({ kv: kv() })
export async function POST(req: NextRequest) { return handler(req) }
