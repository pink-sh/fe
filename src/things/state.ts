import { State } from "app";
import { askConsent, change, notify, through } from "apprise-frontend";
import { thingcalls } from "./calls";
import { randomThing, Thing, withThing } from "./model";


export type ThingState = {
   
    things : {
      all: Thing[];
      selected: string[];
      edited: Thing
    }
    
  };
  
  export const initialThings: ThingState = { 
      things: {
        all: undefined!,
        selected: [],
        edited: undefined!
      } 
  
  };


  export const stateapi = (s:State) => ({

    isReady: () => s.things.all !== undefined,

    fetch: () : Promise<Thing[]> => {
      
       console.log("fetching things...")
       return thingcalls(s).fetch().then(through(stateapi(s).set))
      
    },
  
    set: (things:Thing[]) => change(s).with(s=> s.things.all=things ),


    all: () => s.things.all,
    add: (t:Thing) => change(s).with(s => s.things.all.push(t)),

    remove: (id:string) => askConsent( {title:`Delete a thing.`, 
                                        message: `This cannot be reverted, do you really want to delete this thing?`, 
                                        okText: `Yes, delete this thing now.`,
                                        onOk: ()=>change(s).with(s => s.things.all.splice(s.things.all.findIndex(t => t.id === id), 1))
                                      }),

    removeMany: (things:string[]) => askConsent( {title:`Delete ${things.length} thing(s).`, 
                                       message: `This cannot be reverted, do you really want to delete ${things.length} thing(s)?`, 
                                       okText: `Yes, delete ${things.length} thing(s) now.`,
                                       onOk: ()=> change(s).with(s => s.things.all = s.things.all!.filter(t =>!things.includes(t.id)))}),


    save: (t:Thing) => {
        change(s).with(s => s.things.all.splice(s.things.all.findIndex(t1 => t1.id === t.id),1,t));
        notify({ message: 'Saved.'});
        
    },
   
   
    addRandom: ()=> stateapi(s).add(withThing(s)(randomThing())),
    get: (id:string) => s.things.all.find(t=>t.id===id),


  })