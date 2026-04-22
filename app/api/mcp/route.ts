import { NextRequest } from 'next/server'
import {
  ToolRegistry,
  createMcpHandler,
  createInfoHandler,
  MemoryKV,
  type RuntimeConfig,
} from '@exitmcp/core'
import { OAuthAuthAdapter } from '@exitmcp/auth-oauth'
import { ApiKeyAuthAdapter } from '@exitmcp/auth-apikey'
import { UpstashKVStore } from '@exitmcp/kv-upstash'
import { HostingerHostAdapter } from '@exitmcp/host-hostinger'
import { TOOLS_FS } from '@exitmcp/tools-fs'

import { TOOLS_IMAGE } from '@exitmcp/tools-image'
import { TOOLS_CONTENT_MDX } from '@exitmcp/tools-content-mdx'
import siteConfig from '../../../exitmcp.config'

export const runtime = 'nodejs'
export const maxDuration = 60
export const dynamic = 'force-dynamic'

function kv() {
  if (process.env.UPSTASH_REDIS_REST_URL) return new UpstashKVStore({ namespace: 'exitmcp' })
  console.warn('[exitmcp] No Upstash env vars; using in-memory KV.')
  return new MemoryKV()
}

function runtimeConfig(): RuntimeConfig {
  const store = kv()
  return {
    ...siteConfig,
    kv: store,
    host: new HostingerHostAdapter(),
    auth: [
      new OAuthAuthAdapter({ kv: store }),
      new ApiKeyAuthAdapter({ kv: store }),
    ],
  }
}

const registry = new ToolRegistry()
registry.registerAll(TOOLS_FS).registerAll(TOOLS_IMAGE).registerAll(TOOLS_CONTENT_MDX)

const mcp = createMcpHandler({ config: runtimeConfig(), registry, serverName: 'exitMCP', serverVersion: '0.1.0' })
const info = createInfoHandler({ config: runtimeConfig(), registry, serverName: 'exitMCP', serverVersion: '0.1.0' })

export async function GET(req: NextRequest) {
  if (new URL(req.url).pathname.endsWith('/info')) return info(req)
  return mcp(req)
}
export async function POST(req: NextRequest) { return mcp(req) }
export async function DELETE(req: NextRequest) { return mcp(req) }
