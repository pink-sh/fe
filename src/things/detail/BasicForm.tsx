import { Anchor, Divider } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import { Dropdown, FormState, Item, RichBox, Switch, TextBox } from 'apprise-frontend';
import { Form, FormRow } from 'apprise-frontend/components/form/Form';
import * as React from 'react';
import { Thing } from 'things/model';
import { validateBasic } from './validation';


type Props = FormState<Thing> & {

    report: ReturnType<typeof validateBasic>
}
    



export const BasicForm = (props: Props) => {

    const {edited,set,report} = props;

    const dropdownItems:Item[] = [
        {key : 1, label: "First item"},
        {key : 2, label: "Second item"},
        {key : 3, label: "Third item"},
        {key : 4, label: "Fourth Super Very Long item"},
        {key  : 5, label: "Fifth item"},
    ]

    return ( 
        <Form toc state={props}>

            <Anchor.Link href="#someBasicFields" target="" title="Basic Info"/>
            <Anchor.Link href="#someOtherFields" target="" title="Options" />
            <Anchor.Link href="#someLongStuff"  target="" title="Data Policies" />
            <Anchor.Link href="#someOtherLongStuff" target="" title="Notes" />
            
            <Divider orientation="left" ><span id="someBasicFields">Basic Info</span></Divider>
            
            <FormRow validation={report.name}>

                <TextBox label="Name" style={{flexGrow:2,marginRight:30}} hasFeedback onChange={set( (t,v) => t.name=v)} validation={report.name}>
                    {edited.name}
                </TextBox>
                

                <Switch style={{marginTop:12}} onChange={set((t,v) => t.active=v)}  checkedChildren="active" unCheckedChildren="active" >
                    {edited.active}
                </Switch>

            </FormRow>

 
            <RichBox label="Rich descripton" onChange={set( (t,v) => t.richDescription=v)} validation={report.richDescription}>
                {edited.richDescription}
            </RichBox> 
        
            <TextBox label="Description" validation={report.description} placeholder ="Type away..." autosize={{minRows:3,maxRows:6}} hasFeedback onChange={set( (t,v)=> t.description=v)} >
                {edited.description} 
            </TextBox>

              
            <TextBox label="Password" hidden hasFeedback onChange={set( (t,v)=> t.password=v)}>
                {edited.password} 
            </TextBox>
            


            <Divider orientation="left" ><span id="someOtherFields">Options</span></Divider>

           
            <Dropdown style={{minWidth:600}} label="Item" items={dropdownItems} onChange={set( (t,v) => t.item=v)} validation={report.item}>
                 {edited.item} 
            </Dropdown>

        
            <Divider orientation="left" ><span id="someLongStuff">Data Policies</span></Divider>

                <Paragraph >
                    { Array(10).fill(undefined).map(_=>`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`)}
                </Paragraph>

            <Divider orientation="left" ><span id="someOtherLongStuff">Notes</span></Divider>

             <Paragraph>
                { Array(5).fill(undefined).map(_=> "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.")} 
            </Paragraph>   
        </Form>
     )
}