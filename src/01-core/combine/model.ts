
export type Combined = {
    hash: string;
    raw: string;
}

export type Signature = {
    pub_key: string;
    signature: string;
}

export interface CombineInput<T> {
    raw_transaction: string;
    signatures: [Signature];
    details: T
}