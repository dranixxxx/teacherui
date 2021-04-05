import React from 'react';
import Cookie from "js-cookie";
import axios from 'axios';

export const Context = React.createContext({ isAuthenticated: false });

export class Provider extends React.Component {

    state = {
        user: null,
    }

    componentDidMount() {
        const token = Cookie.get("token");

        if (token) {
            // authenticate the token on the server and place set user object
            axios.get("http://edunet.tranonline.ml/api/user/info", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then(async (res) => {
                // if res comes back not valid, token is not valid
                // delete the token and log the user out on client

                if (!res.data.success) {
                    Cookie.remove("token");
                    this.setState({ user: null });
                    return null;
                }

                const user = await res.data.data;
                this.setUser(user);
                               // console.log(user)
            });
        }
  }
//check fix
    setUser = function(user){this.setState({ user: user });
    };

    render() {
        return (
            <Context.Provider value={{
                user: this.state.user,
                isAuthenticated: !!this.state.user,
                setUser: this.setUser,
            }}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer;