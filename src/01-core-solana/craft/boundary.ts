import * as e from "@org/core/encode";
import * as c from "@org/core/combine";
import * as s from "@org/core/sign";
import * as b from "@org/core/broadcast";

import { CombineInputDetails, Intent, EncodeOutput } from "./model";

export interface Boundary extends e.Boundary<Intent, EncodeOutput>, s.Boundary, c.Boundary<CombineInputDetails>, b.Gate { }