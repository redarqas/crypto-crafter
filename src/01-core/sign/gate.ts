import { SignInput, Signed } from "./model";

export interface Gate {
    sign(input: SignInput): Signed
}