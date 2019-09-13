
import { State } from "app";
import { stateapi, thingActions } from "things";

export const thingapi = (s: State) => ({

    ...stateapi(s),

    actions: thingActions
  
  
});
