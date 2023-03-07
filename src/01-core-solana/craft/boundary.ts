import * as e from "@org/core/encode";
import * as c from "@org/core/combine";
import * as s from "@org/core/sign";
import * as b from "@org/core/broadcast";

import { CombinedDetails, EncodedDetails, Transfer } from "./model";

export interface Boundary extends e.Boundary<Transfer, EncodedDetails>, s.Boundary, c.Boundary<CombinedDetails>, b.Gate { }