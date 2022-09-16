import type { NextApiRequest, NextApiResponse } from 'next'

//get nfts from wallet address
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', `Bearer ${process.env.RARIFY_API_KEY}`)
    // @ts-ignore
    const data = await fetch(`https://api.rarify.tech/data/contracts?` + new URLSearchParams({
        ...req.query
    }), { headers: headers })
    const response = await data.json()
    res.status(200).json(response)
    return response
}