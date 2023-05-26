import React, { useState, useEffect } from 'react'
import './App.css'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/Stack'
import ListGroup from 'react-bootstrap/ListGroup'
import 'bootstrap/dist/css/bootstrap.min.css'
import { InputGroup } from 'react-bootstrap'
import './css/styles.css'

import {
  getItems,
  createItem,
  updateItem,
  deleteItem as deleteItemApi,
} from './api'

const Header = () => {
  return <h1>Budget planner</h1>
}
const Expenses = ({ elements, deleteItem }) => {
  if (elements.length > 0) {
    return (
      <div id='ul-list'>
        <ListGroup id='ul-items'>
          {elements.map((element, index) => (
            <Expense
              key={element.name}
              element={element}
              index={index}
              deleteItem={deleteItem}
            />
          ))}
        </ListGroup>
      </div>
    )
  }
}
const Expense = ({ element, index, deleteItem }) => {
  const onDelete = () => {
    deleteItem(element.name)
  }
  return (
    <React.Fragment>
      <ListGroup.Item id='li-container'>
        <Stack direction='horizontal' id='li-items' gap={2}>
          <ListGroup horizontal id='item-content'>
            <ListGroup.Item as='li' id='item-text'>
              {element.name}
            </ListGroup.Item>
            <ListGroup.Item as='li' id='item-price'>
              ${element.price}
            </ListGroup.Item>
          </ListGroup>
          <Button variant='secondary' id='delete-item' onClick={onDelete}>
            Delete
          </Button>
        </Stack>
      </ListGroup.Item>
    </React.Fragment>
  )
}
const FormInput = ({ onAdd }) => {
  const [item, setItem] = useState('')
  const [price, setPrice] = useState('')
  const onChangeItem = (event) => {
    setItem(event.target.value)
  }
  const onChangePrice = (event) => {
    setPrice(event.target.value)
  }
  async function addElement(event) {
    event.preventDefault()
    if (item.trim() !== '' && price > 0) {
      onAdd(item, price)
      setItem('')
      setPrice('')
    } else {
      alert('Elemento no válido')
    }
  }

  return (
    <form id='form-Input'>
      <Stack direction='horizontal' id='form-elements'>
        <Form.Control
          id='item-input'
          type='text'
          onChange={onChangeItem}
          placeholder='Add an item'
          value={item}
        />
        <InputGroup id='price-input'>
          <InputGroup.Text>$</InputGroup.Text>
          <Form.Control
            name='price-input'
            type='number'
            onChange={onChangePrice}
            placeholder='Add a price'
            value={price}
          />
        </InputGroup>

        <Button variant='primary' onClick={addElement} id='add-input'>
          Add
        </Button>
      </Stack>
      <br />
    </form>
  )
}
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
  }

  async function updateListItem(newName, price, name) {
    const result = await updateItem(
      {
        newName,
        price,
      },
      name
    )
  }

  async function deleteListItem(name) {
    const result = await deleteItemApi(name)
    getListItems()
  }

  return (
    <div id='main-container'>
      <React.Fragment>
        <Header />
        <FormInput onAdd={createListItem} />
        <br />
        <Expenses elements={items} deleteItem={deleteListItem} />
      </React.Fragment>
    </div>
  )
}
export default App
