export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const logIn = user => {
    return { type: LOGIN, user };
};

export const logOut = () => ({
    type: LOGOUT
});
