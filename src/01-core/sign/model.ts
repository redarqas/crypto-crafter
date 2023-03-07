
export type SignInput = {
    raw_transaction: string;
    private_key: string;
}

export type Signed = {
    signature: string;
    raw_transaction: string;
}