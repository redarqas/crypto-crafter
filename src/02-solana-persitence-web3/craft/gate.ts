import * as e from "@org/core/encode";
import * as c from "@org/core/combine";
import * as s from "@org/core/sign";
import * as b from "@org/core/broadcast";
import * as sol from "@org/core/solana";
import { CreateDelegateStakeInstructions, Instructions, TransferInstructions } from "./model";

class SolanaWeb3GateImplem implements sol.Gate<Instructions> {

    encode(instruction: Instructions): Promise<e.Encoded<sol.EncodeOutput>> {

        switch (instruction) {
            case instruction as TransferInstructions:
                throw new Error("Method not implemented.");
            case instruction as CreateDelegateStakeInstructions:
                throw new Error("Method not implemented.");
            default:
                throw new Error("Method not implemented.");
        }

    }

    sign(input: s.SignInput): Promise<s.Signed> {
        throw new Error("Method not implemented.");
    }

    combine(instruction: c.CombineInput<sol.CombineInputDetails>): Promise<c.Combined> {
        throw new Error("Method not implemented.");
    }

    broadcast(input: b.BroadcastInput): Promise<b.Broadcasted> {
        throw new Error("Method not implemented.");
    }
}

type SolanaWeb3GateCompanion = {
    make(s: string): SolanaWeb3GateImplem
}

export const SolanaWeb3Gate = {
    make: function (
        deps: string
    ): sol.Gate<Instructions> {
        return new SolanaWeb3GateImplem()
    }
}