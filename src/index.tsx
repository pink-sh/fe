import { state } from "app";
import { App, Scaffold, Section } from 'apprise-frontend';
import { Home } from 'home';
import { mockery } from 'mockery';
import React from 'react';
import ReactDOM from 'react-dom';
import { Things } from 'things';
import "./variables.css";



ReactDOM.render(

        <App prefix="fe" initState={state} mockery={mockery} >

            <Scaffold title="Embryo" icon="ant-design" >
              
                <Section title="Home" icon="home" path="/" exact>
                    <Home/>
                </Section>
              
                <Section title="Things" icon="pie-chart" path="/things">
                    <Things/>
                </Section>
     
            </Scaffold>
        
        </App>
        
        , document.getElementById('root'));


