import { State } from "app";
import { random, randomNumber, modelLike } from "apprise-frontend";
import { Multilang, MultilangDto, withMultilang } from "apprise-frontend/components/form/multilang";

export type ThingDto = {
  id:string
  name: string;
  active: true | false;
  item: 1 | 2 | 3 | 4 | 5 ;
  label: MultilangDto
  description?: string
  password?:string
  tags?:string[]
  longDescription: MultilangDto,
  richDescription: string,
  richDescriptions: MultilangDto
  parts: PartDto[]
};


export type PartDto = {

  id:string;
  name: string;

}

export const newThing = () : ThingDto  =>  ({ ...modelLike(randomThing()), id :random("id")})

export const randomThing = () : ThingDto  => (
    { id: random("id",10000), 
      name: random("thing"), 
      active: false, 
      item: randomNumber(5)+1 as 1 | 2 | 3 | 4 | 5 ,
      label: {"en":random("label"),"fr":random("étiquette")},
      longDescription: {"en":random("some description"),"fr":random("Une description")},
      richDescription: `<p>Some <strong>rich</strong> ${random("text")}.</p><p><em>Very</em> ${random("rich")}.</p>`,
      richDescriptions: {"en": `<p>Some <strong>rich</strong> text.</p><p><em>Very</em> rich.</p>`,"fr":`<p>Une description <strong>riche</strong>.</p><p><em>Très</em> riche.</p>`},
      parts: Array(10).fill(undefined).map(_=>randomPart())
    }
);

export const newPart = () : PartDto  =>  ({ ...modelLike(randomPart()), id :random("id")})

export const randomPart = () : PartDto  => ({

  id: random("id",10000), 
  name: random("part"),

})

export type Thing = ThingDto & {

  get: ()=>ThingDto
  withLabel: ()=>Multilang
}

export const withThing = (s: State) => (dao: ThingDto) : Thing => ({

  ...dao,
  
  get: ()=>dao ,

  withLabel:  ()=>withMultilang(s)(dao.label),


})
