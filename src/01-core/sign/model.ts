
export type SignInput = {
    rawTransaction: string;
    privateKey: string;
}

export type Signed = {
    signature?: string;
    rawTransaction: string;
}