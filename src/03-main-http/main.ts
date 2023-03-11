import { Server } from "@org/delivery/http";
import { Program } from "./program";
import { Config } from './config';

const config: Config = Config.default()
Server.serve(Program.make(config), config.port)
