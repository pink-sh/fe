import { Button, Empty } from "antd";
import Title from "antd/lib/typography/Title";
import { given, State } from "app";
import { connect, Language, Sidebar, randomNumber, randomUser, slideoutapi, Page, allLanguages } from "apprise-frontend";
import * as React from "react";
import { useTranslation } from "react-i18next";


const randomChange = (lang:Language) : Language =>  {

  const keys = allLanguages
  var newlang = lang;
  while (newlang=== lang)
   newlang = allLanguages[randomNumber(keys.length)]
  
  return newlang;
}

export const Home =  connect ( ( state: State) => {

  const {t} = useTranslation()
  const {intl, users: {setLogged: set}} = given(state)
  const slideout = slideoutapi(state)

  return (

     <Page>

       <Sidebar title="Home" />

      <div style={{ textAlign: "center", "paddingTop":"50px"}}>
        <Title>{t("home.title")}</Title>
        <br/>
        <Empty/>
        <br/>
        <Button onClick={()=>set(randomUser())}>{t("home.login")}</Button>
        &nbsp;&nbsp;
        <Button onClick={()=> intl.setCurrentLanguage(randomChange(intl.currentLanguage()))}>{t("home.change language")}</Button>
        <br/><br/>
        <Button onClick={()=>slideout.openWith({title:"Some Slideout", content:Empty})}>Slideout</Button>
    
      </div>
      </Page>
  )
})

export const HomeSider = () => {
  return (
    <Sidebar title="Home"><div></div></Sidebar>
  )
};