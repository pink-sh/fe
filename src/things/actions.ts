import { withAction } from "apprise-frontend";


export const things = "things";


export const thingActions = { 
    
    manage:  withAction({ name:"manage", labels:["manage"],  type: things,   description: "can add, edit, and remove things"})

}