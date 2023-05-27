import React, { useState, useEffect } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import './css/styles.css'

import Header from './components/Header'
import FormInput from './components/FormInput'
import Expenses from './components/Expenses'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import {
  getItems,
  createItem,
  updateItem as updateItemApi,
  deleteItem as deleteItemApi,
} from './api/index'
import { notify } from './services/notify'

const App = () => {
  const [items, setItems] = useState([])

  useEffect(() => {
    getListItems()
  }, [])

  async function getListItems() {
    const result = await getItems()
    if (result) setItems(result)
  }

  async function createListItem(name, price) {
    const result = await createItem({
      name,
      price,
    })
    getListItems()
    notify('success', 'add_item_success', 'Item added successfully')
  }

  async function updateListItem(newName, price, name) {
    const result = await updateItemApi(
      {
        newName,
        price,
      },
      name
    )
    getListItems()
    notify('success', 'update_item_success', 'Item updated successfully')
  }

  async function deleteListItem(name) {
    const result = await deleteItemApi(name)
    getListItems()
    notify('warning', 'delete_item_success', 'Item deleted successfully')
  }

  return (
    <div className='main-container'>
      <React.Fragment>
        <Header />
        <FormInput onAdd={createListItem} />
        <br />
        <Expenses
          elements={items}
          deleteItem={deleteListItem}
          updateItem={updateListItem}
        />
      </React.Fragment>
      <ToastContainer
        position='top-right'
        autoClose={800}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  )
}
export default App
