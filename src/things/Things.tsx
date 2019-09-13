
import { given, State } from "app";
import { connect, Placeholder, Spinner, useLoadingEffect } from "apprise-frontend";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Route } from "react-router-dom";
import { Detail } from "./detail";
import { List } from "./list/List";


export const Things = connect ( (props:RouteComponentProps & State) => {

  const {isReady,fetch} = given(props).things;

  useLoadingEffect({
        unless: isReady() ,
        task: fetch,
        error:"Cannot fetch the list of things."
  })

  return  <Spinner showOn={!isReady()}  placeholder={Placeholder.list} >
              <Route exact path={props.match.url} component={List} />
              <Route path={props.match.url+"/:id"} component={Detail} />
          </Spinner>
  

}, props => props.things );






