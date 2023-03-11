import { BroadcastInput, Broadcasted } from "@org/core/broadcast";
import { CombineInput, Combined } from "@org/core/combine";
import { Encoded } from "@org/core/encode";
import { SignInput, Signed } from "@org/core/sign";
import { Boundary, CombineInputDetails, EncodeOutput, Gate, Intent, IntentType } from "@org/core/solana";
import { CreateDelegateStakeInstruct, Instruct, TransferInstruct } from "@org/gate/solana/craft";



export class SolanaBoundary implements Boundary {

    constructor(private readonly gate: Gate<Instruct>) { }

    encode(intent: Intent): Promise<Encoded<EncodeOutput>> {
        switch (intent.type) {
            case IntentType.Transfer:
                return this.gate.encode(TransferInstruct.from(intent))
            case IntentType.CreateStake:
                return CreateDelegateStakeInstruct.from(intent).then(ixs => this.gate.encode(ixs))
            default:
                throw new Error("Intent type not supported.");
        }
    }

    sign(input: SignInput): Promise<Signed> {
        return this.gate.sign(input)
    }

    combine(input: CombineInput<CombineInputDetails>): Promise<Combined> {
        return this.gate.combine(input)
    }
    broadcast(input: BroadcastInput): Promise<Broadcasted> {
        return this.gate.broadcast(input)
    }

}

