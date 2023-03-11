export enum Network {
    main = 'main',
    dev = 'dev'
}

/* export interface Config2 {
    networks: Map<Network, string>;
}

const Config = {
    load: function (): Config2 {
        return {
            networks: new Map<Network, string>(Object.entries(process.env)
                .filter(([key, value]) => key.startsWith('NETWORK_') && value !== undefined)
                .map(([key, value]) => [key.slice(8).toLowerCase() as Network, value] as [Network, string]))
        }
    },

    default: function (): Config2 {
        return {
            networks: new Map<Network, string>([
                [Network.Main, "https://api.mainnet-beta.solana.com"],
                [Network.Dev, "https://api.devnet.solana.com"]
            ])
        };
    }
} */