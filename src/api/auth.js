/*/lib/auth.js */

import Cookie from "js-cookie";
import axios from "axios";
import { Redirect } from "react-router-dom";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://edunet.tranonline.ml";

//register a new user
export const registerUser = (name, email, password, role) => {
    //prevent function from being ran on the server
    if (typeof window === "undefined") {
        return;
    }
    return new Promise((resolve, reject) => {
        axios
            .post(`${API_URL}/api/auth/register/`, { name, email, password, role })
            .then((res) => {
                //set token response from Strapi for server validation
                Cookie.set("token", res.data.data.token);

                //resolve the promise to set loading to false in SignUp form
                resolve(res);
                //redirect back to home page for restaurance selection
            })
            .catch((error) => {
                //reject the promise and pass the error object back to the form
                reject(error);
            });
    });
};

export const login = (email, password) => {
    //prevent function from being ran on the server
    if (typeof window === "undefined") {
        return;
    }

    return new Promise((resolve, reject) => {
        axios
            .post(`${API_URL}/api/auth/login/`, { email, password })
            .then((res) => {
                //set token response from Strapi for server validation
                Cookie.set("token", res.data.data.token);
                //resolve the promise to set loading to false in SignUp form
                resolve(res);
                //redirect back to home page for restaurance selection

                window.history.pushState("","","/");
                window.location.reload(true);
            })
            .catch((error) => {
                //reject the promise and pass the error object back to the form
                reject(error);
            });
    });
};

export const logout = () => {
    //remove token and user cookie
    Cookie.remove("token");
    delete window.__user;
    // sync logout between multiple windows
    window.localStorage.setItem("logout", Date.now());
    //redirect to the home page
    window.history.pushState("","","/");
    window.location.reload(true);
};

//Higher Order Component to wrap our pages and logout simultaneously logged in tabs
// THIS IS NOT USED in the tutorial, only provided if you wanted to implement
// export const withAuthSync = (Component) => {
//     const Wrapper = (props) => {
//         const syncLogout = (event) => {
//             if (event.key === "logout") {
//                 Router.push("/login");
//             }
//         };
//
//         useEffect(() => {
//             window.addEventListener("storage", syncLogout);
//
//             return () => {
//                 window.removeEventListener("storage", syncLogout);
//                 window.localStorage.removeItem("logout");
//             };
//         }, []);
//
//         return <Component {...props} />;
//     };
//
//     if (Component.getInitialProps) {
//         Wrapper.getInitialProps = Component.getInitialProps;
//     }
//
//     return Wrapper;
// };