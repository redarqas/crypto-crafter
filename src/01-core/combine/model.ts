
export type Combined = {
    hash?: string;
    raw: string;
}

export type Signature = {
    signerPubKey: string;
    signature: string;
}

export interface CombineInput<T> {
    rawTransaction: string;
    signatures: [Signature];
    details: T
}