import type { NextApiRequest, NextApiResponse } from 'next'
//get nfts from wallet address
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', process.env.RARIFY_API_KEY)
    const data: any = await fetch(`https://api.rarify.tech/data/wallets?` + new URLSearchParams({
        ...req.query as any
    }), { headers: headers })
    const response = await data.json()
    res.status(200).json(response)
    return response
}