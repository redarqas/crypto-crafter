import { CombineInput, Combined } from "./model";

export interface Gate<T> {
    combine(instruction: CombineInput<T>): Promise<Combined>
}

