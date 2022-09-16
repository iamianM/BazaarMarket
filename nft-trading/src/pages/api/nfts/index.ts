import type { NextApiRequest, NextApiResponse } from 'next'

//get nfts from the blockchain
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', process.env.NFT_PORT_API_KEY)
    const data = await fetch('https://api.nftport.xyz/v0/nfts?chain=ethereum&include=all', { headers: headers })
    const response = await data.json()
    res.status(200).json(response)
    return response
}