import { Encoded } from "./model";

export interface Boundary<I, T> {
    encode(intent: I): Promise<Encoded<T>>
}

