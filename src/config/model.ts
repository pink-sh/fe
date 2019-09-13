import { BaseConfig, withBaseConfig } from "apprise-frontend";

export type Config = BaseConfig & {

    someprop : string
}


export const withConfig =  (self:Config) => ({

    ...withBaseConfig(self),

    // todo

})