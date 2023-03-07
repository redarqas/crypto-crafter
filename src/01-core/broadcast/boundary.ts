import { BroadcastInput, Broadcasted } from "./model";

export interface Boundary {
    broadcast(input: BroadcastInput): Broadcasted
}