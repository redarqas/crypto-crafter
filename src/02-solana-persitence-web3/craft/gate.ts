import * as e from "@org/core/encode";
import * as c from "@org/core/combine";
import * as s from "@org/core/sign";
import * as b from "@org/core/broadcast";
import * as solana from "@org/core/solana";

class SolanaWeb3GateImplem implements solana.Gate {

    broadcast(input: b.BroadcastInput): b.Broadcasted {
        throw new Error("Method not implemented.");
    }
    sign(input: s.SignInput): s.Signed {
        throw new Error("Method not implemented.");
    }
    combine(instruction: c.CombineInput<solana.CombinedDetails>): c.Combined {
        throw new Error("Method not implemented.");
    }
    encode(intent: solana.Transfer): e.Encoded<solana.EncodedDetails> {
        throw new Error("Method not implemented.");
    }
}

type SolanaWeb3GateCompanion = {
    make(s: string): SolanaWeb3GateImplem
}

export const SolanaWeb3Gate = {
    make: function (
        deps: string
    ): solana.Gate {
        return new SolanaWeb3GateImplem()
    }
}