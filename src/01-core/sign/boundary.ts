import { SignInput, Signed } from "./model";

export interface Boundary<> {
    sign(input: SignInput): Signed
}