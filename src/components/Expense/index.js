import React, { useState } from 'react'

import { Button, ButtonGroup, Stack, ListGroup, Form } from 'react-bootstrap'

const Expense = ({ element, deleteItem, updateItem }) => {
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
      <ListGroup.Item className='li-container'>
        <Stack direction='horizontal' className='li-items' gap={2}>
          <ListGroup horizontal className='item-content'>
            <ListGroup.Item as='li' className='item-text'>
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
            <ListGroup.Item as='li' className='item-price'>
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

export default Expense
