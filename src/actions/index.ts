import { createAction } from "redux-actions";
import{SET_TABLE_BORDER_FOR_REDUX,SET_A_COLOR_FOR_REDUX} from "./actiontypes";
export class IndexAction {
    static setTableBorderForRedux = createAction(SET_TABLE_BORDER_FOR_REDUX, (param?: string) => {
        return { param: param }
    });

    static setAColorForRedux = createAction(SET_A_COLOR_FOR_REDUX, (param?: string) => {
        return { param: param }
    });

}
