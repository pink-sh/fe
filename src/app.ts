import { BaseState, givenBase, initialBase } from 'apprise-frontend';
import { configapi } from 'config';
import { initialThings, thingapi, ThingState } from 'things';





export type State = BaseState & ThingState;

export const state : State = { ...initialBase, ...initialThings };


export const given = (s:State) => ({ ...givenBase(s),

    config: configapi(s),
    things: thingapi(s)
})




