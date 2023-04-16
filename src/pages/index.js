import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Item from '@/components/item.js'
import { useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })
var item_data = []


function HandleSubmit(event) {
  // event.preventDefault();
  const form = event.target;
  const form_data = new FormData(form)
  
  const form_json = Object.fromEntries(form_data.entries());
  item_data.push(form_json);
  localStorage.setItem("todoItems",JSON.stringify(item_data));
}

export default function Home() {
  
  useEffect(() => {
    // localStorage.clear();
    let storedItems = JSON.parse(localStorage.getItem("todoItems"));
    if (storedItems) {
      item_data = storedItems
    }
  }, []);

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
          {item_data.map((item, index) => <li key={item.itemName+index}><Item item_name={item.itemName} item_due_date={item.itemDueDate}/></li>)}
        </ul>

        <form onSubmit={HandleSubmit}>
          <label className={styles.label}>
            Enter item needing done: <input type="text" name="itemName"></input>
          </label>
          <br/>
          <label>
            Date Needed done by: <input type="date" name="itemDueDate"></input>
          </label>
          <br/>
          <button type="submit">Add List Item</button>
        </form>
      </main>
    </>
  )
}
