import { SET_TABLE_BORDER_FOR_REDUX, SET_A_COLOR_FOR_REDUX } from './../actions/actiontypes';
const initialState = {
    todo: {
        tableBorder: false,
        aColor: false
    }
}

export const todo = (state = initialState, action) => {
    switch (action.type) {
        case SET_TABLE_BORDER_FOR_REDUX:
            let tableBorder = action.payload;
            return { ...state, todo: { ...state.todo, tableBorder } }
        case SET_A_COLOR_FOR_REDUX:
            let aColor = action.payload;
            return { ...state, todo: { ...state.todo, aColor } }
        default:
            return state;
    }
}
