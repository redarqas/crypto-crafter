import { Network } from "@org/delivery/http/solana"

export type SolanaConfig = {
    networks: Map<Network, string>
}

export type Config = {
    port: number
    solana: SolanaConfig
}

export const Config = {
    default: function (): Config {
        return {
            port: 3000,
            solana: {
                networks: new Map<Network, string>([
                    [Network.main, "https://api.mainnet-beta.solana.com"],
                    [Network.dev, "https://api.devnet.solana.com"]
                ])
            }
        }
    }
}