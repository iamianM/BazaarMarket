declare namespace NodeJS {
    interface ProcessEnv {
        NFT_PORT_API_KEY: string;
        UBIQUITY_API_KEY: string;
        RARIFY_API_KEY: string;
        INFURA_API_KEY: string;
        PACK_ADMIN_PRIVATE_KEY: string;
    }
}

declare module '@nfttrader-io/sdk-js'
declare module 'uuid'