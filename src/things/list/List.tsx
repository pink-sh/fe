import { given, State } from "app";
import { ActionButton, all, connect, Page, Sidebar, Tab, Table, Topbar, useListState, PageHeader } from "apprise-frontend";
import { paramsIn } from "apprise-frontend/utils/routes";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import { GivenVTable } from "react-virtualized-table";
import { Thing } from "things";





export const List = connect( (props:RouteComponentProps & State) => {

    const {match:{url}} = props
    const {users: {logged},things} = given(props);
    
    const { actions:{manage} } = things
    
    const {selected,setSelected,resetSelected,noSelection} = useListState<string>();

    const addrandom = < ActionButton type="primary" name="Add Thing" icon="plus" 
                                     enabled={logged.can(manage)} 
                                     onClick={all(things.addRandom,resetSelected)}  />
   
    const removeselected =  <ActionButton name={`Remove ${selected.length || ''} selected`} icon="delete" 
                                          enabled={logged.can(manage)} disabled={ noSelection  } 
                                          onClick={all(()=>things.removeMany(selected),resetSelected) }  />

    const open = ({id}:Thing) => <ActionButton key={1} name= "Open" icon= "edit" linkTo={ `${url}/${id}` } />
    const remove =  ({id}:Thing) => <ActionButton key={2} name="Remove" icon="delete" 
                                                  enabled={logged.can(manage)} 
                                                  onClick={ ()=> things.remove(id) } />


    const columns = GivenVTable.columns().addSortableColumnFor('name')
                                         .addSortableColumnFor('active')
                                         .addSortableColumnFor('item')
                                         .result

    const {tab} = paramsIn(props) 
    var filter = filterFor(tab) ;
    

    
    return  <Page>

                <Sidebar>
                  
                  {addrandom}<br />   
                  {removeselected}<br />
                
                </Sidebar> 
  
                <Topbar>

                    <PageHeader title="All Things" />
       
                      <Tab default id="all" icon="bars" name="All" />
                      <Tab id="even" icon="code" name="Even" />
                      <Tab id="odd" icon="code" name="Odd" />
       
                      {addrandom}
                      {removeselected}
       
                </Topbar>
  
                <Table items={things.all().filter(filter)} 
                        columns={columns} 
                        actions={(t:Thing) => [open(t),remove(t)]} 
                        onClickLinkTo={item=>`${url}/${item.id}`} 
                        onChangeSelection={(ts:Thing[]) => setSelected(ts.map(t=>t.id))} />
                
    
            </Page>
        
  }, props => props.match )

  

  const filterFor = (tab) => {

    switch (tab) {
        case "even" : return (item:Thing) => (+/(\d+)/g.exec(item.name)![1] % 2)===0
        case "odd" : return (item:Thing) => (+/(\d+)/g.exec(item.name)![1] % 2)===1;
        default: return t=>t
    }
  }
