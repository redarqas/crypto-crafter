import * as e from "@org/core/encode";
import * as c from "@org/core/combine";
import * as s from "@org/core/sign";
import * as b from "@org/core/broadcast";
import * as sol from "@org/core/solana";
import * as web3 from "@solana/web3.js";
import { Instruct, InstructType } from "./model";
import { InstrutionsEncoder } from "./intsrutions-encoder";

class SolanaWeb3GateImplem implements sol.Gate<Instruct> {

    private readonly encoder: InstrutionsEncoder;
    constructor(private readonly connection: web3.Connection) {
        this.encoder = new InstrutionsEncoder(connection)
    }

    encode(instruction: Instruct): Promise<e.Encoded<sol.EncodeOutput>> {
        switch (instruction.type) {
            case InstructType.Transfer:
                return this.encoder.encodeTransfer(instruction)
            case InstructType.CreateStake:
                return this.encoder.encodeCreateStake(instruction)
            default:
                throw new Error("Instruction type not supported");
        }
    }

    sign(input: s.SignInput): Promise<s.Signed> {
        let keyPair = web3.Keypair.fromSeed(Buffer.from(input.privateKey, "hex"));
        let tx = web3.Transaction.from(Buffer.from(input.rawTransaction, "hex"))
        tx.sign({ publicKey: keyPair.publicKey, secretKey: keyPair.secretKey })
        return new Promise<s.Signed>((resolve, _) => {
            resolve({
                signature: tx.signatures[0].signature?.toString("hex"),
                rawTransaction: input.rawTransaction
            })
        })
    }

    combine(input: c.CombineInput<sol.CombineInputDetails>): Promise<c.Combined> {
        let transaction = web3.Transaction.from(Buffer.from(input.rawTransaction, "hex"))
        input.signatures.forEach(sigInfo => {
            transaction.addSignature(new web3.PublicKey(sigInfo.signerPubKey), Buffer.from(sigInfo.signature, "hex"))
        })
        return new Promise<c.Combined>((resolve, _) => {
            resolve({
                hash: transaction.signature?.toString("hex"),
                raw: transaction.serialize().toString("hex")
            })
        })
    }

    broadcast(input: b.BroadcastInput): Promise<b.Broadcasted> {
        let transactionBuffer = Buffer.from(input.encodedTransaction, "hex")
        return this.connection.sendRawTransaction(transactionBuffer).then(sig => { return { transactionIdentifier: sig } })
    }
}


export const SolanaWeb3Gate = {
    make: function (
        connection: web3.Connection
    ): sol.Gate<Instruct> {
        return new SolanaWeb3GateImplem(connection)
    }
}