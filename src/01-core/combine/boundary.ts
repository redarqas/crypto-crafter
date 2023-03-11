import { CombineInput, Combined } from "./model";

export interface Boundary<T> {
    combine(instruction: CombineInput<T>): Promise<Combined>
}
