import * as React from 'react';
import { render } from "react-dom";
import router from "./config/router";
import { reducers } from "./reducers/index";
import { AppBase } from "grapecity-grapeleaf-common";
import "./util/binds";
import "./style/index.less";

render(
    <AppBase
        reducers={reducers}
        cdnUrl={`${process.env.CDN}`}
        onLoaded={locale => {
            return new Promise((resolve, reject) => {
                switch (locale.locale) {
                    case "en":
                        require.ensure([], () => {
                            resolve(require("./locales/en.json"));
                        }, "en.json");
                        break;
                    default:
                        require.ensure([], () => {
                            resolve(require("./locales/zh.json"));
                        }, "zh.json");
                        break;
                }
            })
        }}
    >{router}</AppBase>, document.getElementById("app_content"));
