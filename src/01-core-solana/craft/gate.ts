import * as e from "@org/core/encode";
import * as c from "@org/core/combine";
import * as s from "@org/core/sign";
import * as b from "@org/core/broadcast";
import { CombineInputDetails, EncodeOutput } from "./model";

export interface Gate<I> extends e.Gate<I, EncodeOutput>, s.Gate, c.Gate<CombineInputDetails>, b.Gate { }