import { SignInput, Signed } from "./model";

export interface Boundary<> {
    sign(input: SignInput): Promise<Signed>
}