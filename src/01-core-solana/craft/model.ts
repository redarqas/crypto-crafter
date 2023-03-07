/**
 * Intents
 */
export interface Intent { }

export type Transfer = Intent & {
    sender: string;
    receiver: string;
    amount: number;
    feePayer: string;
}

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



export type EncodedDetails = {
    todo: string
}

export type CombinedDetails = {}
