import { Controller } from "@org/delivery/http";
import { SolanaBoundary, SolanaController } from "@org/delivery/http/solana";
import { Network } from "src/02-delivery-http-express-solana/model";
import { SolanaWeb3Gate } from "src/02-solana-persitence-web3/craft/gate";
import { SolanaConfig } from "src/03-main-http/config";
import * as web3 from "@solana/web3.js";
import { Boundary } from "@org/core/solana";

export const DepedencyGraph = {
    make: function (config: SolanaConfig): Controller {
        let boundaries = new Map<Network, Boundary>
        config.networks.forEach((url: string, name: Network) => {
            let gate = SolanaWeb3Gate.make(new web3.Connection(url))
            let boundary = new SolanaBoundary(gate)
            boundaries.set(name, boundary)
        })
        return new SolanaController(boundaries)
    }
}