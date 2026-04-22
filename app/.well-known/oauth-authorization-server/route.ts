import { NextRequest } from 'next/server'
import { createAuthServerMetadataHandler } from '@exitmcp/auth-oauth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const handler = createAuthServerMetadataHandler()
export async function GET(req: NextRequest) { return handler(req) }
