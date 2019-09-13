import { Form, FormState, MultiBox, MultiRichBox } from "apprise-frontend";
import * as React from "react";
import { Thing } from "things/model";
import { validateMultiLang } from "./validation";


type Props = FormState<Thing> & {

    report: ReturnType<typeof validateMultiLang>
}



export const LangForm = (props : Props) => {
      
    const {edited,set,report} = props;

    return  <Form state={props}>

            <MultiBox label="Label" validation={report.label} onChange={set( (t,v)=> t.label=v) }>
                {edited.label}
            </MultiBox>

            
            <MultiBox label="Long description in multiple languages" autosize={{minRows:3,maxRows:6}} validation={report.description} 
                      onChange={set( (t,v)=> t.longDescription=v) }>
                {edited.longDescription}
            </MultiBox>


            <MultiRichBox label="Rich descriptions in multiple languages" validation={report.richDescription}
                          onChange={set( (t,v)=> t.richDescription=v) }>
                {edited.richDescriptions}
            </MultiRichBox>

        </Form>
    
}