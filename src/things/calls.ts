import { given, State } from "app";
import { withThing } from "./model";

const things = "/thing"

export const thingcalls = (s:State) => ({

    fetch: () => given(s).call.at(things).get().then(ts=>ts.map(withThing(s)))

})