import { CreateDelegateStake, Transfer } from "@org/core/solana";
import * as web3 from "@solana/web3.js";

export enum InstructType {
    Transfer = "transfer",
    CreateStake = "create_stake"
}
export type Instruct = TransferInstruct | CreateDelegateStakeInstruct

export type TransferInstruct = {
    type: InstructType.Transfer,
    feePayer: web3.PublicKey,
    params: web3.TransferParams
}

export const TransferInstruct = {
    from: function (transferIntent: Transfer): TransferInstruct {
        let sender = new web3.PublicKey(transferIntent.sender)
        return {
            type: InstructType.Transfer,
            feePayer: sender,
            params: {
                fromPubkey: sender,
                toPubkey: new web3.PublicKey(transferIntent.receiver),
                lamports: transferIntent.amount
            }
        }
    }
}


export type CreateDelegateStakeInstruct = {
    type: InstructType.CreateStake,
    feePayer: web3.PublicKey,
    params: [web3.CreateAccountWithSeedParams, web3.InitializeStakeParams, web3.DelegateStakeParams]
}
export const CreateDelegateStakeInstruct = {
    from: function (intent: CreateDelegateStake, stakeParams: { seed: string, stakePubkey: web3.PublicKey }): CreateDelegateStakeInstruct {
        let fromPubkey = new web3.PublicKey(intent.fromAccount)
        //let seed = randomstring.generate({ length: 32, charset: "alphanumeric", })
        //let stakePubkey = sol.PublicKey.createWithSeed(fromPubkey, seed, sol.StakeProgram.programId)
        let votePubkey = new web3.PublicKey(intent.voteAccount)
        return {
            type: InstructType.CreateStake,
            feePayer: fromPubkey,
            params: [
                {
                    basePubkey: fromPubkey,
                    lamports: intent.amount,
                    space: web3.StakeProgram.space,
                    programId: web3.StakeProgram.programId,
                    fromPubkey: fromPubkey,
                    newAccountPubkey: stakeParams.stakePubkey,
                    seed: stakeParams.seed
                }, {
                    stakePubkey: stakeParams.stakePubkey,
                    authorized: new web3.Authorized(fromPubkey, fromPubkey)

                }, {
                    authorizedPubkey: fromPubkey,
                    stakePubkey: stakeParams.stakePubkey,
                    votePubkey: votePubkey
                }

            ]
        }
    }
}

