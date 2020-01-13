import { LOGIN, LOGOUT } from "../actions";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const initialState = {
    login: cookies.get("Username"),
    id: +cookies.get("Id"),
    authorized: cookies.get("Authorized") === "" ? false : true
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return Object.assign({}, state, {
                login: action.user.login,
                id: action.user.id,
                authorized: action.user.authorized
            });
        case LOGOUT:
            return {};
        default:
            return state;
    }
};
