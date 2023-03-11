import { Boundary, CombineInputDetails, EncodeOutput, Intent } from "@org/core/solana";
import { Network } from "../model";
import { BroadcastInput, Broadcasted } from "@org/core/broadcast";
import { CombineInput, Combined } from "@org/core/combine";
import { Encoded } from "@org/core/encode";
import { SignInput, Signed } from "@org/core/sign";


export class Service {

    private boundary(network: Network): Boundary {
        return this.boundaries.get(network)!
    }

    constructor(private readonly boundaries: Map<Network, Boundary>) {

    }
    encode(network: Network, intent: Intent): Promise<Encoded<EncodeOutput>> {
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
