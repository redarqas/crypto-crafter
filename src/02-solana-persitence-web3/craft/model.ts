import { CreateDelegateStake, Transfer } from "@org/core/solana";
import * as sol from "@solana/web3.js";

export interface Instructions { }

export type TransferInstructions = Instructions & sol.TransferParams
export const TransferInstructions = {
    from: function (transferIntent: Transfer): TransferInstructions {
        return {
            fromPubkey: new sol.PublicKey(transferIntent.sender),
            toPubkey: new sol.PublicKey(transferIntent.receiver),
            lamports: transferIntent.amount
        }
    }
}

export type CreateDelegateStakeInstructions = Instructions & [sol.CreateAccountWithSeedParams, sol.InitializeStakeParams, sol.DelegateStakeParams]
export const CreateDelegateStakeInstructions = {
    from: function (intent: CreateDelegateStake, stakeParams: { seed: string, stakePubkey: sol.PublicKey }): CreateDelegateStakeInstructions {
        let fromPubkey = new sol.PublicKey(intent.fromAccount)
        //let seed = randomstring.generate({ length: 32, charset: "alphanumeric", })
        //let stakePubkey = sol.PublicKey.createWithSeed(fromPubkey, seed, sol.StakeProgram.programId)
        let votePubkey = new sol.PublicKey(intent.voteAccount)
        return [
            {
                basePubkey: fromPubkey,
                lamports: intent.amount, // + stakeAccRentExemptAmount,
                space: sol.StakeProgram.space,
                programId: sol.StakeProgram.programId,
                fromPubkey: fromPubkey,
                newAccountPubkey: stakeParams.stakePubkey,
                seed: stakeParams.seed
            }, {
                stakePubkey: stakeParams.stakePubkey,
                authorized: new sol.Authorized(fromPubkey, fromPubkey)

            }, {
                authorizedPubkey: fromPubkey,
                stakePubkey: stakeParams.stakePubkey,
                votePubkey: votePubkey
            }

        ]
    }
}