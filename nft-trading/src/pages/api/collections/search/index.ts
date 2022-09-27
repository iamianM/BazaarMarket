import type { NextApiRequest, NextApiResponse } from 'next'

//get collections from chain
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', `Bearer ${process.env.RARIFY_API_KEY}`)
    headers.append('Access-Control-Allow-Origin', '*')
    const data: any = await fetch(`https://api.rarify.tech/data/contracts?` + new URLSearchParams({
        ...req.query as any
    }), { headers: headers })
    const response = await data.json()
    res.status(200).json(response)
    return response
}