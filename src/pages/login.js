import Head from "next/head";
import Router from "next/router";
import { useState } from "react";

export default function Login({setToken}){
    const [errors, setErrors] = useState({});

    function validateLogin({username, password}) {
        setToken(true);
        return true;
    }

    function validateForm(form_object) {
        const temp_errors = {}
        if (form_object.username === "") {
            temp_errors.username = "Username cannot be blank!"
        }
        setErrors(temp_errors);
        return !Object.keys(temp_errors).length
    }

    function handleSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const form_data = new FormData(form)
        
        const form_object = Object.fromEntries(form_data.entries());
        console.log(form_object);
        if (validateForm(form_object) && validateLogin(form_object)) {
            Router.push('/')
        }
    }

    return (
        <>
            <Head>
                <title>Login - Todo App</title>
                <meta name="description" content="Todo List App Login Page" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <h1>Welcome to Todo List App!</h1>
                <br/>
                <h3>Login</h3>
                <hr/>
                <form onSubmit={handleSubmit}>
                    <label>
                        Username: <input type="text" name="username"></input> {errors.username}
                    </label>
                    <br/>
                    <label>
                        Password: <input type="password" name="password"></input>
                    </label>
                    <br/>
                    <label>{errors.failed_login}</label>
                    <button type="submit">Sign-In</button>
                </form>
                <label>
                    Don't have an account? <button onClick={() => Router.push('/register')}>Register</button>
                </label>
            </main>
        </>
    )
}