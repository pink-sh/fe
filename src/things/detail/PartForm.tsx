import { Anchor, Divider, Icon } from "antd";
import Title from "antd/lib/typography/Title";
import { ActionButton, Drawer, Form, FormState, ItemDetail, ItemState, ListBox, TextBox, Topbar, useEditingState } from "apprise-frontend";
import * as React from "react";
import { newPart, PartDto, Thing } from "things/model";
import { validatePart, validateParts } from "./validation";


type Props = FormState<Thing> & {

    report: ReturnType<typeof validateParts>
}


const detail : ItemDetail<PartDto> = {   
         
    makeNew: newPart,
    validate: validatePart,
    edit:   (state) =>  <PartDetailForm {...state} />
}

const basiclist = {name:"basic", render: (part: PartDto) =>  <PartItem part={part}/> }
    
const tablelist = {name:"table", columns: [ {key:"id"},{key:"name"}] }

export const PartForm = (props : Props) => {

    const { edited,original, set,report } = props

     return  <Form toc state={props} >

        <Anchor.Link href="#horizontal" target="" title="Horizontal List"/>
        <Anchor.Link href="#vertical" target="" title="Vertical Lists" />
        <Anchor.Link href="#standalone" target="" title="Standalone Lists" />
        <Anchor.Link href="#table"  target="" title="Table" />

        <Divider orientation="left" ><span id="horizontal">Horizontal lists</span></Divider>

        <ListBox label="Part List" type={basiclist}  items={edited.parts} original={original.parts} onChange={set( (t,v) => t.parts=v)} detail={detail}  validation={report.parts}/>

        <br/>

        <ListBox label="Part Table" height={300} type={tablelist} items={edited.parts} original={original.parts} onChange={set( (t,v) => t.parts=v)} detail={detail}  validation={report.parts}/> 

    
      
{/* 
        <Divider orientation="left" ><span id="vertical">Vertical lists</span></Divider>

        <ListBox label="Simple Parts" layout="vertical" items={edited.parts} onChange={set( (t,v) => t.parts=v)} detail={listDetail} validation={report.parts}/>

        <Divider orientation="left" ><span id="standalone">Standalone lists</span></Divider>

        <ListBox label="Simple Parts" layout="vertical"  items={edited.parts} onChange={set( (t,v) => t.parts=v)} standalone detail={detail} validation={report.parts}/> */}
   
    </Form>
    
}


const PartItem = (props: { part: PartDto }) => {

    const { part} = props

    return  <span>{part.id+":"+part.name}</span>
           
}



const PartDetailForm = (props: ItemState<PartDto> ) => {

    const { currentItem, initialItem, saveItem } = props

    const formstate = useEditingState(currentItem,initialItem)

    const {reset,edited,dirty,set} = formstate

    const report = validatePart(edited)

   
    return     <Drawer 
                        title={ <Title level={3}>{<Icon type="appstore"/>} { edited.name  || "..." }</Title> } 
                        visible 
                        onClose={() => saveItem(edited) } 
                        width={600}>
                                        
        
                    <Topbar>
                        <ActionButton size="small" type="primary" name="Revert" enabled={dirty} icon="undo"  onClick={()=> { reset(initialItem,false) } }/>
                    </Topbar>

                    <Form state={formstate} >

                        <TextBox label="Name" hasFeedback onChange={set( (t,v) => t.name=v ) } validation={report.name}>
                            {edited.name}
                        </TextBox>

                    </Form>  
        
                </Drawer>
    
    
    
          

}