import type { SiteConfig } from '@exitmcp/core'

const config: SiteConfig = {
  name: "guidr",
  github: { owner: "polgold", repo: "guidr", branch: "main" },
  content: {
    dirs: ["content/blog", "content/guides"],
    publicDir: 'public',
  },
  fs: {
    allowed: ["content/blog/**", "content/guides/**", "public/**"],
    denied: ["**/.env*", "**/node_modules/**", ".git/**"],
  },
  tier: 'free',
}

export default config
