/**
 * Solana Intents
 */
export interface Intent { }
export type Transfer = Intent & {
    sender: string;
    receiver: string;
    amount: number;
    feePayer: string;
}
/** companion object pattern **/
export const Transfer = {
    withSenderAsFeePayer: function (sender: string, receiver: string, amount: number): Transfer {
        return {
            sender: sender,
            receiver: receiver,
            amount: amount,
            feePayer: sender
        };
    }
}

export type CreateDelegateStake = {
    fromAccount: string;
    voteAccount: string;
    amount: number
}

export type Stake = Intent & {}
export type CombineInputDetails = {}
/**
 * Outputs
 */
export interface EncodeOutput { }
export type TransferOutput = EncodeOutput & {}
export type CreateDelegateStakeOutput = EncodeOutput & { stakePubkey: string }
//export type EncodeOutput = {}