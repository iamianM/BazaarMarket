import type { NextApiRequest, NextApiResponse } from 'next'
//get nft details
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', process.env.NFT_PORT_API_KEY)
    headers.append('Access-Control-Allow-Origin', '*')
    const contract_address = req.query.contract_address
    const token_id = req.query.token_id
    const data: any = await fetch(`https://api.nftport.xyz/v0/nfts/${contract_address}/${token_id}?` + new URLSearchParams({
        ...req.query as any
    }), { headers: headers })
    const response = await data.json()
    res.status(200).json(response)
    return response
}