import { randomUser } from "apprise-frontend";
import MockAdapter from "axios-mock-adapter";
import { randomThing, ThingDto } from "things";
import { thingActions } from "things/actions";


export const mockery= (mock:MockAdapter) => {
  
  mock.onGet("fe/config.json").reply(200,{
    mode: "dev",
    services: {
      be:{"prefix":"be",default:true}
    }, 
    intl:{ 
      languages:["en","fr","es"],
      required:["en"]
    },
    someprop: "application property"

  })

  mock.onGet("/be/logged").reply(200, {...randomUser(),actions: [
    thingActions.manage,
  ]})

  mock.onGet("/be/thing").reply(200,Array(10).fill(undefined).map((_,i) => (
    
    {...randomThing(), id:`id-${i}`, name:`Thing${i}`} as ThingDto 
    
  ) ))
  
      
  mock.onAny().passThrough()

}