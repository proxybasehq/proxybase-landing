const rules = [
  {
    name: 'cloudflare',
    regex: /cloudflare|cf-ray|__cf_bm|cf-chl|cf-request-id/i,
    challengeRegex: /attention required|cf challenge|captcha|checking your browser|just a moment/i,
  },
  {
    name: 'datadome',
    regex: /datadome|ddv1|x-datadome|datadome-client/i,
    challengeRegex: /datadome|captcha|access denied|blocked/i,
  },
  {
    name: 'akamai',
    regex: /akamai|akamai-ghost|akamaized|akamai-bot/i,
    challengeRegex: /access denied|reference #|akamai|bot detected/i,
  },
  {
    name: 'perimeterx',
    regex: /perimeterx|px-captcha|pxhd|_px\d/i,
    challengeRegex: /perimeterx|px-captcha|blocked/i,
  },
  {
    name: 'hcaptcha',
    regex: /hcaptcha|h-captcha-response|hcaptcha\.com/i,
  },
  {
    name: 'recaptcha',
    regex: /recaptcha|g-recaptcha|recaptcha\.net/i,
  },
  {
    name: 'imperva',
    regex: /imperva|incapsula|visid_incap|incap_ses/i,
    challengeRegex: /imperva|incapsula|blocked|security check/i,
  },
  {
    name: 'f5',
    regex: /f5\-|f5traffic|ts_cookie|BIGipServer/i,
    challengeRegex: /f5|challenge|security check/i,
  },
  {
    name: 'aws-waf',
    regex: /aws-waf|x-amzn-requestid.*403|awselb/i,
    challengeRegex: /access denied|request blocked|waf/i,
  },
  {
    name: 'cloudfront',
    regex: /x-amz-cf-id|x-amz-cf-pop|cloudfront/i,
  },
  {
    name: 'fastly',
    regex: /x-served-by.*fastly|fastly-ff|fastly-io/i,
  },
  {
    name: 'varnish',
    regex: /x-varnish|x-cache.*varnish|via:.*varnish/i,
  },
  {
    name: 'sucuri',
    regex: /sucuri|cloudproxy|sucuri-cloudproxy/i,
    challengeRegex: /sucuri|access denied|blocked/i,
  },
  {
    name: 'distil',
    regex: /distil|distilnetworks/i,
    challengeRegex: /distil|captcha|blocked/i,
  },
  {
    name: 'fingerprintjs',
    regex: /fingerprintjs|fpjs|fingerprint.*js/i,
  },
]

/**
 * @param {string} input — combined headers + body text to scan
 * @returns {{ matches: string[], challengeMatches: string[] }}
 */
export function detectBotProtection(input) {
  const matches = []
  const challengeMatches = []

  for (const rule of rules) {
    if (rule.regex.test(input)) matches.push(rule.name)
    if (rule.challengeRegex?.test(input)) challengeMatches.push(rule.name)
  }

  return {
    matches: [...new Set(matches)],
    challengeMatches: [...new Set(challengeMatches)],
  }
}
