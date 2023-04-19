import Head from "next/head";
import Router from "next/router";

export default function Register() {
    function handleSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const form_data = new FormData(form)
        
        const form_object = Object.fromEntries(form_data.entries());
        console.log(form_object);    
    }

    return (
        <>
            <Head>
                <title>User Registration - Todo App</title>
                <meta name="description" content="Todo List App Registration Page" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <h1>Welcome to Todo List App!</h1>
                    <br/>
                    <h3>Register User:</h3>
                    <hr/>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Username: <input type="text" name="username"></input>
                        </label>
                        <label>
                            Password: <input type="password" name="password"></input>
                        </label>
                        <button type="submit">Register</button>
                    </form>
                    <label>
                        Already have an Account? <button onClick={() => Router.push('login')}>Sign-in</button>
                    </label>
            </main>
        </>
    )
}