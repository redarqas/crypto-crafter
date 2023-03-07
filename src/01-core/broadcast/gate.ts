import { BroadcastInput, Broadcasted } from "./model";

export interface Gate {
    broadcast(input: BroadcastInput): Promise<Broadcasted>
}