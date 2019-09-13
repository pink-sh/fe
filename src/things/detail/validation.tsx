
import { given, State } from "app";
import { check, checkIt, empty, invalidCharacters, languages, notdefined, uniqueWith, withReport, containsInvalid } from "apprise-frontend/utils/validation";
import * as React from "react";
import { Thing, ThingDto, PartDto } from "things/model";
import Paragraph from "antd/lib/typography/Paragraph";



export const validateBasic = (one:ThingDto, state:State) => { 

    const things = given(state).things.all();

    
    return withReport({

        name: check(one.name).with(uniqueWith( things, t => t.id !== one.id && t.name === one.name) )
                         .with(empty)
                         .with(invalidCharacters)
                         .nowOr("A descriptive and unique identifier.", 
                            <Paragraph ellipsis={{rows:2,expandable:true}}>
                             Lorem ipsum dolor sit amet,<i>consectetur adipiscing elit</i>, sed do eiusmod tempor incididunt ut <b>labore et dolore</b> magna aliqua.
                             <br/>
                             Ut enim ad minim veniam,<a href='http://www.lipsum.com/'>quis nostrud exercitation ullamco laboris...</a>.
                             </Paragraph>
                        ),
  
        item: check(one.item).with(notdefined).nowOr("Take your pick.", "Things can have one of five possible items."),
  
  
        description: checkIt().nowOr("Free-form annotation.","Knock yourself out."),
        richDescription: check(one.richDescription).with(empty).nowOr("A free-form desription with formattting.", "Rich descriptions are used in editors, for materials to be rendered.")

   })
  

}

export const validateMultiLang = (one:Thing, state:State) => {

    const requiredLangs = given(state).config.intl.required || [];

    return withReport({

        label: check(one.label).with(notdefined).with(languages(requiredLangs)).nowOr(
            "A descriptive label in multiple languages.",
            `Labels describe things through out the interface, and must be provided in some languages (${requiredLangs}).`),

        description: check(one.longDescription).with(notdefined).with(languages(requiredLangs)).nowOr(
            "A free-form description.",
            `Descriptions can be as a long as they need to be, and must be provided in some languages (${requiredLangs}).`),

        richDescription: check(one.richDescriptions).with(notdefined).with(languages(requiredLangs)).nowOr(
            "A free-form HTML description.",
            `Descriptions can be as a long as they need to be, and must be provided in some languages (${requiredLangs}).`)
    })
} 

export const validateChoices = (one:Thing) => withReport({

    tags: check(one.tags).nowOr("Pick one or more tags.",
                                `Pick your choice(s) from small or large lists.`
    
                            )

}) 

export const validateParts = (one:Thing) => withReport({

   parts: check(one.parts).with(containsInvalid(validatePart),"Some parts are invalid.").nowOr("Add or remove parts", "Things are made of zero or more parts.")

}) 


export const validatePart = (one:PartDto) => withReport({

    
        name:  check(one.name).with(empty).nowOr("A descriptive and unique identifier.",
        
                            <Paragraph ellipsis={{rows:2,expandable:true}}>
                            Lorem ipsum dolor sit amet,<i>consectetur adipiscing elit</i>, sed do eiusmod tempor incididunt ut <b>labore et dolore</b> magna aliqua.
                            <br/>
                            Ut enim ad minim veniam,<a href='http://www.lipsum.com/'>quis nostrud exercitation ullamco laboris...</a>.
                            </Paragraph>
        )

})