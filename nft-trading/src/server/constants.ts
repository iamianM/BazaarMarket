export const baseUrl = process.env.NEXT_PUBLIC_NETLIFY_URL
    ? `https://${process.env.NEXT_PUBLIC_NETLIFY_URL}`
    : 'http://localhost:3000'


export const url = `${baseUrl}/api/trpc`
