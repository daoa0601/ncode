const BLOCKED_MCPB_HOSTNAMES = new Set([
  'localhost',
  'metadata.google.internal',
])

function parseIpv4(hostname: string): number[] | null {
  const parts = hostname.split('.')
  if (parts.length !== 4) return null
  const octets = parts.map(part => {
    if (!/^\d+$/.test(part)) return NaN
    const value = Number(part)
    return value >= 0 && value <= 255 ? value : NaN
  })
  return octets.every(Number.isInteger) ? octets : null
}

function isBlockedIpv4(octets: number[]): boolean {
  const [a, b] = octets
  return (
    a === 0 ||
    a === 10 ||
    a === 127 ||
    (a === 100 && b >= 64 && b <= 127) ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    a >= 224
  )
}

export function validateMcpbDownloadUrl(value: string): string | null {
  let parsed: URL
  try {
    parsed = new URL(value)
  } catch {
    return 'MCPB URL must be a valid URL'
  }

  if (parsed.protocol !== 'https:') {
    return 'MCPB URL must use https'
  }
  if (parsed.username || parsed.password) {
    return 'MCPB URL must not include credentials'
  }
  if (!parsed.pathname.endsWith('.mcpb') && !parsed.pathname.endsWith('.dxt')) {
    return 'MCPB URL must end with .mcpb or .dxt'
  }

  const hostname = parsed.hostname.toLowerCase()
  if (
    BLOCKED_MCPB_HOSTNAMES.has(hostname) ||
    hostname.endsWith('.localhost') ||
    hostname.endsWith('.local')
  ) {
    return 'MCPB URL host is not allowed'
  }
  if (hostname.includes(':')) {
    return 'MCPB URL must not use an IP literal host'
  }

  const ipv4 = parseIpv4(hostname)
  if (ipv4 && isBlockedIpv4(ipv4)) {
    return 'MCPB URL host is not allowed'
  }

  return null
}
