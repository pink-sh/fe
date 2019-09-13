
import Text from "antd/lib/typography/Text";
import { given, State } from "app";
import { ActionButton, connect, FormState, Page, PageHeader, paramsIn, parentPathIn, Sidebar, Tab, Topbar, useEditingState } from "apprise-frontend";
import { NoSuchRoute } from "apprise-frontend/components/NoSuchRoute";
import { RouteGuard } from "apprise-frontend/components/RouteGuard";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Thing } from "things/model";
import { BasicForm } from "./BasicForm";
import { ChoicesForm } from "./ChoicesForm";
import { LangForm } from "./LangForm";
import { PartForm } from "./PartForm";
import { validateBasic, validateChoices, validateMultiLang, validateParts } from "./validation";


type Props = State & RouteComponentProps <{id:string}>;

export const Detail = connect( (props:Props) => {

    const {match:{params:{id}}} = props

    const {users:{logged},things} = given(props);
    
    const thing = things.get(id);

    if (thing===undefined)     
        return <NoSuchRoute backTo={parentPathIn(props)} />
 
    const {save,actions:{manage}} = things;
        
    const manageIt = manage.specialiseTo(id);

    const formstate = useEditingState(thing);

    const {edited,reset,dirty} = formstate 
    
    const remove = < ActionButton name="Remove" icon="delete" 
                                  enabled={logged.can(manageIt)} disabled={dirty} 
                                  onClick={()=> { things.remove(id ); props.history.push(parentPathIn(props))}} />



    const report = {basic:validateBasic(edited,props),
        lang:validateMultiLang(edited,props),
        choices:validateChoices(edited),
        parts: validateParts(edited)} 

    const totalErrors = Object.keys(report).reduce((total,key)=>total+=report[key].errors(),0)

    const revert = <ActionButton name="Revert" icon="undo" enabled={dirty} type="danger" onClick={()=>reset(edited)} />
    const saveact = <ActionButton name="Save" icon="save" enabled={dirty} disabled={totalErrors>0} type="primary" onClick={()=>save(edited)} badge={totalErrors>0} />
                   

    const {tab} = paramsIn(props)
    



 
    return  <Page>

                <Sidebar title="Things">
                    {saveact}<br/>
                    {revert}<br/> 
                    {remove}<br/>
                    <br/>
                     {totalErrors>0 && <Text type="danger">{totalErrors} error(s).</Text> }
                    </Sidebar> 
  
                <Topbar>

                    <PageHeader title={thing.name} />
                   
                    {saveact}
                    {revert}
                    {remove} 
                    <Tab default id="basic" icon="form" name="Basic" badge={report.basic.errors()>0} />
                    <Tab id="lang" icon="flag" name="MultiLang" badge={report.lang.errors()>0}/>
                    <Tab id="choices" icon="bars" name="Choices" badge={report.choices.errors()>0}/>
                    <Tab id="parts" icon="appstore" name="Parts" badge={report.parts.errors()>0} />

                </Topbar>
  
                {formFor(tab,formstate,report)}
                            
                <RouteGuard when={dirty} />


            </Page>
        
  })


  const formFor = ( tab: any, formstate: FormState<Thing>, report) => {

    switch (tab) {
        case "lang": return <LangForm {...formstate} report={report.lang} />
        case "choices": return <ChoicesForm {...formstate} report={report.choices} />
        case "parts": return <PartForm {...formstate} report={report.parts} />
        default: return <BasicForm {...formstate} report={report.basic} />
    }
  
}