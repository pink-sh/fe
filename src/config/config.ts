import { State } from "app";
import { Config } from "config";
import { withConfig } from "./model";

export const configapi = (s: State) => ({

   // casts the base config and wraps an api around it 
   ...withConfig( s.config as Config)
   
})