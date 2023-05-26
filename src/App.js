import React, { useState, useEffect } from 'react'
import './App.css'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/Stack'
import ListGroup from 'react-bootstrap/ListGroup'
import 'bootstrap/dist/css/bootstrap.min.css'
import { InputGroup } from 'react-bootstrap'
import './css/styles.css'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Col from 'react-bootstrap/Col'
import Toast from 'react-bootstrap/Toast'
import {
  getItems,
  createItem,
  updateItem as updateItemApi,
  deleteItem as deleteItemApi,
} from './api/index'

const Header = () => {
  return <h1>Budget planner</h1>
}
const Expenses = ({ elements, deleteItem, updateItem }) => {
  if (elements.length > 0) {
    return (
      <div className='ul-list'>
        <ListGroup id='ul-items'>
          {elements.map((element, index) => (
            <Expense
              element={element}
              index={index}
              deleteItem={deleteItem}
              updateItem={updateItem}
            />
          ))}
        </ListGroup>
      </div>
    )
  }
}

const Expense = ({ element, index, deleteItem, updateItem }) => {
  const [reading, setReading] = useState(true)
  const [editItemValue, setEditItemValue] = useState(element.name)
  const [editItemPrice, setEditItemPrice] = useState(element.price)
  const onDelete = () => {
    reading ? deleteItem(element.name) : setReading(!reading)
  }
  const onUpdate = () => {
    if (reading) {
      setReading(!reading)
      setEditItemValue(element.name)
      setEditItemPrice(element.price)
    } else {
      updateItem(editItemValue, editItemPrice, element.name)
      setReading(!reading)
    }
  }
  const onChangeItemValue = (event) => {
    setEditItemValue(event.target.value)
  }
  const onChangeItemPrice = (event) => {
    setEditItemPrice(event.target.value)
  }
  return (
    <React.Fragment>
      <ListGroup.Item id='li-container'>
        <Stack direction='horizontal' id='li-items' gap={2}>
          <ListGroup horizontal id='item-content'>
            <ListGroup.Item as='li' id='item-text'>
              {reading ? (
                element.name
              ) : (
                <Form.Control
                  id='item-value'
                  type='text'
                  onChange={onChangeItemValue}
                  placeholder={element.name}
                  value={editItemValue}
                />
              )}
            </ListGroup.Item>
            <ListGroup.Item as='li' id='item-price'>
              {reading ? (
                `$ ${element.price}`
              ) : (
                <Form.Control
                  type='text'
                  onChange={onChangeItemPrice}
                  placeholder={element.price}
                  value={editItemPrice}
                />
              )}
            </ListGroup.Item>
          </ListGroup>
          <div className='btn-options'>
            <ButtonGroup aria-label='options'>
              <Button variant='success' id='update-item' onClick={onUpdate}>
                {reading ? 'Update' : 'Save'}
              </Button>
              <Button variant='danger' id='delete-item' onClick={onDelete}>
                {reading ? 'Delete' : 'Cancel'}
              </Button>
            </ButtonGroup>
          </div>
        </Stack>
      </ListGroup.Item>
    </React.Fragment>
  )
}
const FormInput = ({ onAdd }) => {
  const [item, setItem] = useState('')
  const [price, setPrice] = useState('')
  const [showAlert, setShowAlert] = useState(false)
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
      setItem('') //Clear field
      setPrice('') //Clear field
    } else {
      setShowAlert(true)
    }
  }
  return (
    <React.Fragment>
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
      <div className='alert-form'>
        <Col md={6} className='mb-2' id='alert-container'>
          <Toast
            show={showAlert}
            onClose={() => setShowAlert(false)}
            delay={3500}
            autohide
          >
            <Toast.Header>
              <strong className='me-auto'>Warning</strong>
              <small>Just now</small>
            </Toast.Header>
            <Toast.Body>Please check the item and price fields</Toast.Body>
          </Toast>
        </Col>
      </div>
    </React.Fragment>
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
    const result = await updateItemApi(
      {
        newName,
        price,
      },
      name
    )
    getListItems()
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
        <Expenses
          elements={items}
          deleteItem={deleteListItem}
          updateItem={updateListItem}
        />
      </React.Fragment>
    </div>
  )
}
export default App
