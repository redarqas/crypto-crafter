import { Boundary, CombineInputDetails, EncodeOutput, Intent } from "@org/core/solana";
import { Network } from "../model";
import * as web3 from "@solana/web3.js";
import { SolanaWeb3Gate } from "@org/gate/solana/craft";
import { SolanaBoundary } from "./solana-boundary";
import { BroadcastInput, Broadcasted } from "@org/core/broadcast";
import { CombineInput, Combined } from "@org/core/combine";
import { Encoded } from "@org/core/encode";
import { SignInput, Signed } from "@org/core/sign";


export class Service {


    /*     private init(config: Config): void {
            config.networks.forEach((url: string, name: Network) => {
                let gate = SolanaWeb3Gate.make(new web3.Connection(url))
                let boundary = new SolanaBoundary(gate)
                this.boundaries.set(name, boundary)
            })
        } */
    private boundary(network: Network): Boundary {
        return this.boundaries.get(network)!
    }

    constructor(private readonly boundaries: Map<Network, Boundary>) {

    }
    encode(network: Network, intent: Intent): Promise<Encoded<EncodeOutput>> {
        console.log("-----------------------------------------------------------------------")
        console.log(network)
        console.log(intent)
        return this.boundary(network).encode(intent)
    }
    sign(network: Network, input: SignInput): Promise<Signed> {
        return this.boundary(network).sign(input)
    }
    combine(network: Network, input: CombineInput<CombineInputDetails>): Promise<Combined> {
        return this.boundary(network).combine(input)
    }
    broadcast(network: Network, input: BroadcastInput): Promise<Broadcasted> {
        return this.boundary(network).broadcast(input)
    }

} 
