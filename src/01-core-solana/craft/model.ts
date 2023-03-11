/** Solana Intents */
export enum IntentType {
    Transfer = "transfer",
    CreateStake = "create_stake"
}
export type Intent = Transfer | CreateDelegateStake
export type Transfer = {
    type: IntentType.Transfer,
    sender: string;
    recipient: string;
    amount: number;
    feePayer: string;
}

export type CreateDelegateStake = {
    type: IntentType.CreateStake,
    fromAccount: string;
    voteAccount: string;
    amount: number
}

export type Stake = {}
export type CombineInputDetails = {}

/** outputs */
export type EncodeOutput = TransferOutput | CreateDelegateStakeOutput
export type TransferOutput = {}
export type CreateDelegateStakeOutput = { stakePubkey: string }
