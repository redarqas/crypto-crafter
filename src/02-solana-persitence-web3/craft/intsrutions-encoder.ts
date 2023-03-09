import * as e from "@org/core/encode";
import * as sol from "@org/core/solana";
import * as web3 from "@solana/web3.js";
import { CreateDelegateStakeInstruct, TransferInstruct } from "./model";



export class InstrutionsEncoder {

    private connection: web3.Connection;

    constructor(connection: web3.Connection) {
        this.connection = connection
    }

    async encodeTransfer(ixs: TransferInstruct): Promise<e.Encoded<sol.EncodeOutput>> {
        let transaction = new web3.Transaction()
        transaction.recentBlockhash = await this.connection.getLatestBlockhash().then(lb => lb.blockhash)
        transaction.feePayer = ixs.feePayer
        transaction.add(web3.SystemProgram.transfer(ixs.params))
        let encodeMessage = transaction.serialize({
            requireAllSignatures: false, verifySignatures: false
        })
        return {
            rawTransaction: encodeMessage.toString("hex"),
            details: {}
        }
    }
    async encodeCreateStake(ixs: CreateDelegateStakeInstruct): Promise<e.Encoded<sol.EncodeOutput>> {
        let transaction = new web3.Transaction()
        transaction.recentBlockhash = await this.connection.getLatestBlockhash().then(lb => lb.blockhash)
        transaction.feePayer = ixs.feePayer
        transaction.add(web3.SystemProgram.createAccountWithSeed(ixs.params[0]))
        transaction.add(web3.StakeProgram.initialize(ixs.params[1]))
        transaction.add(web3.StakeProgram.delegate(ixs.params[2]))
        let encodeMessage = transaction.serialize({
            requireAllSignatures: false, verifySignatures: false
        })
        return {
            rawTransaction: encodeMessage.toString("hex"),
            details: {}
        }
    }

}