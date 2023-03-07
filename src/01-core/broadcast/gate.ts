import { BroadcastInput, Broadcasted } from "./model";

export interface Gate {
    broadcast(input: BroadcastInput): Broadcasted
}