import { NextRequest } from 'next/server'
import { createProtectedResourceMetadataHandler } from '@exitmcp/auth-oauth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const handler = createProtectedResourceMetadataHandler({ resourceName: 'exitMCP' })
export async function GET(req: NextRequest) { return handler(req) }
