/* /pages/login.js */
import React, { useState, useEffect, useContext } from 'react';
import { Container, Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { login } from "../api/auth";
import AppContext from "../context/AppContext";
import logo200Image from '../assets/img/logo/logo_200.png';

// class Login extends Component{
//     state = {
//         data: {email:'',password:''},
//         loading:false,
//         error:false,
//     };
//     this.onChange = this.onChange.bind(this);
//      componentDidMount() {
//     const appContext = this.context.user
//
//     console.log(this.context) // { name: 'Tania', loggedIn: true }
//   }

function Login() {
     const [data, updateData] = useState({ email: "", password: "" });
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState(false);
     const appContext = useContext(AppContext);
    useEffect(() => {
        if (appContext.isAuthenticated===true) {
            console.log("aaa")
            //history.push("/"); // redirect if you're already logged in
            window.history.pushState("","","/");
        }
    }, []);

    function onChange(event) {
        updateData({ ...data, [event.target.name]: event.target.value });
    }

    return (
        <Container>
      <Form
      >
          <div className="text-center pb-4">
            <img
              src={logo200Image}
              className="rounded"
              style={{ width: 60, height: 60, cursor: 'pointer' }}
              alt="logo"
            />
          </div>
        <FormGroup>
          <Label for='user'>Email</Label>
          <Input
            onChange={(event) => onChange(event)}
            name="email"
            style={{ height: 50, fontSize: "1.2em" }}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            onChange={(event) => onChange(event)}
            type="password"
            name="password"
            style={{ height: 50, fontSize: "1.2em" }}
          />
        </FormGroup>
        <hr />
        <Button
          size="lg"
          className="bg-gradient-theme-left border-0"
          block
          onClick={() => {
                    setLoading(true);
                    console.log(data, loading)
                    login(data.email, data.password)
                        .then((res) => {
                            setLoading(false);
                            // set authed User in global context to update header/app state
                             console.log(appContext)
                            //console.log(appContext.user)
                            // appContext.setUser(res.data.data);
                            // console.log("success")
                        })
                        .catch((error) => {
                            setError(error.response);
                            console.log("false")
                            setLoading(false);
                        });
                }}
            >
                {loading ? "Loading... " : "Login"}
        </Button>
      </Form>
    </Container>
);
}

export default Login;