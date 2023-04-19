import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Task from '@/components/task.js'
import { useState } from 'react'
import { nanoid } from 'nanoid'
import Login from './login'

const inter = Inter({ subsets: ['latin'] })

// TODO: Add 'react-form-hook' to the pages to make them more seemless

export default function Home() {
  const [token, setToken] = useState();
  const [tasks, setTask] = useState([]);
  const [errors, setErrors] = useState({});

  if (!token) {
    return <Login setToken={setToken}/>
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const form_data = new FormData(form)
    
    const form_object = Object.fromEntries(form_data.entries());
    form_object.id = `${form_object.name}-${nanoid()}`
    if (handleValidation(form_object)) {
      setTask([...tasks, form_object])
    }
  }

  function deleteTask(id) {
    const removed_task_list = tasks.filter((task) => (id !== task.id));
    setTask(removed_task_list);
  }

  function handleValidation(form_object) {
    const temp_errors = {}
    if (form_object.name === "") {
      temp_errors.name = "Name cannot be blank!"
    }
    if (form_object.due_date === "") {
      temp_errors.due_date = "Due date must be selected"
    } 
    setErrors(temp_errors);
    return !Object.keys(temp_errors).length
  }

  function createErrors(input_name) {
    if (errors[input_name]) {
      return (
        <label>{errors[input_name]}</label>
      )
    } 
  }

  return (
    <>
      <Head>
        <title>Todo App</title>
        <meta name="description" content="Todo List App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.div}>
          <h1 className={styles.h1}> To-Do List</h1>
        </div>
        <ul>
          {tasks.map((task) => <li key={task.id}><Task name={task.name} due_date={task.due_date} id={task.id} deleteTask={deleteTask}/></li>)}
        </ul>

        <form onSubmit={handleSubmit}>
          <label className={styles.label}>
            Enter item needing done: <input type="text" name="name"></input> {createErrors("name")}
          </label>
          <br/>
          <label>
            Date Needed done by: <input type="date" name="due_date"></input> {createErrors("due_date")}
          </label>
          <br/>
          <button type="submit">Add List Item</button>
        </form>
          <button onClick={() => setTask([])}>Clear All Items From List</button>
      </main>
    </>
  )
}
