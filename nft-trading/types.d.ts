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
    contract_: string,
    token_address: string,
    description: string,
    image: string,
    banner: string,
}

export type Item = {
    contract_address: string
    token_id: string
    metadata: {
        name: string
        description: string
        ipfs_image?: string
        image?: string
    }
    image?: string
    name?: string
    file_url?: string
    cached_file_url?: string
    owner: string | string[] | undefined
} 