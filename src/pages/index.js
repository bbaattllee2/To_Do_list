import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Task from '@/components/task.js'
import { useState } from 'react'
import { nanoid } from 'nanoid'

const inter = Inter({ subsets: ['latin'] })



export default function Home() {
  const [tasks, setTask] = useState([])
  
  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const form_data = new FormData(form)
    
    const form_object = Object.fromEntries(form_data.entries());
    form_object.id = `${form_object.name}-${nanoid()}`
    setTask([...tasks, form_object])
  }

  function deleteTask(id) {
    const removed_task_list = tasks.filter((task) => (id !== task.id));
    setTask(removed_task_list);
  }

  return (
    <>
      <Head>
        <title>Todo List App</title>
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
            Enter item needing done: <input type="text" name="name"></input>
          </label>
          <br/>
          <label>
            Date Needed done by: <input type="date" name="due_date"></input>
          </label>
          <br/>
          <button type="submit">Add List Item</button>
        </form>
          <button onClick={() => setTask([])}>Clear All Items From List</button>
      </main>
    </>
  )
}
