import {config as baseConfig} from "../wdio.conf.js";

export const config = Object.assign(baseConfig, {
    //All dev env specific key val pairs
    devInstanceBaseURL: "https://dev140755.service-now.com"
});