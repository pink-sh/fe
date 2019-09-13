import { Divider, Select } from "antd";
import { Form, FormState, SelectBox, VSelectBox } from "apprise-frontend";
import * as React from "react";
import { Thing } from "things/model";
import { validateChoices } from "./validation";


type Props = FormState<Thing> & {

    report: ReturnType<typeof validateChoices>
}

export const ChoicesForm = (props: Props) => {
 
    const {edited,set,report} = props;

    return  <Form state={props}>

            <Divider orientation="left" ><span id="selectone">Single Pick</span></Divider>

            <SelectBox label="One Tag" validation={report.tags} placeholder="Pick a tag..." value={edited.tags && edited.tags[0]} onChange={set( (t,v)=> t.tags= v ? [v] : v)}>
               {["removable","editable","selectable"].map( o=> <Select.Option  key={o}>{o}</Select.Option>) }
            </SelectBox>

            <VSelectBox label="One Tag Among Many" validation={report.tags} placeholder="Pick a tag..." onChange={set( (t,v) => t.tags = v ? [v] : v) } options={["removable","editable","selectable"]}>

                { edited.tags && edited.tags[0] }

            </VSelectBox>

            <Divider orientation="left" ><span id="selectmany">Multiple Picks</span></Divider>
 
            <SelectBox mode="multiple" label="Many Tags" validation={report.tags} placeholder="Pick tags..." value={edited.tags} onChange={set( (t,v)=> t.tags=v)}>
               {["removable","editable","selectable"].map( o=> <Select.Option  key={o}>{o}</Select.Option>) }
            </SelectBox>


            <VSelectBox mode="multiple" label="Many Tags among very many" validation={report.tags} placeholder="Pick tags..." onChange={set( (t,v) => t.tags=v) } options={["removable","editable","selectable"]}>

                { edited.tags}

            </VSelectBox>


        </Form>
    
}