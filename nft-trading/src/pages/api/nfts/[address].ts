import type { NextApiRequest, NextApiResponse } from 'next'

//get nfts from wallet address
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', process.env.NFT_PORT_API_KEY)
    const address = req.query.address
    const data = await fetch(`https://api.nftport.xyz/v0/accounts/${address}?chain=ethereum&account_address=0x6C9F5052A7b6319e5ef8dBe96811ac48FD3979Ca&page_size=5&include=metadata`, { headers: headers })
    const response = await data.json()
    res.status(200).json(response)
    return response
}