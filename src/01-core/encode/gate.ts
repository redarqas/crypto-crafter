import { Encoded } from "./model";

export interface Gate<I, T> {
    encode(instruction: I): Encoded<T>
}