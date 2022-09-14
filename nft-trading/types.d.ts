export type Collection = {
    name: string,
    symbol: string,
    token_address: string,
    contract_type: string,
    image?: string,
}

export type NFT = {
    token_address: string,
    token_id: string,
    image?: string,
    name?: string,
    description?: string,
    owner?: string,
}

export type FeaturedCollection = {
    name: string,
    token_address: string,
    description: string,
    image: string,
    banner: string,
}