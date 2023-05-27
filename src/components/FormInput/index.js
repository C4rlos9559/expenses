import React, { useState } from 'react'

import { Button, Form, Stack, InputGroup } from 'react-bootstrap'

const FormInput = ({ onAdd }) => {
  const [item, setItem] = useState('')
  const [price, setPrice] = useState('')

  const onChangeItem = (event) => {
    setItem(event.target.value)
  }
  const onChangePrice = (event) => {
    setPrice(event.target.value)
  }

  async function addElement() {
    if (item.trim() !== '' && price > 0) {
      onAdd(item, price)
      setItem('') //Clear field
      setPrice('') //Clear field
    }
  }

  return (
    <React.Fragment>
      <form className='form-Input'>
        <Stack direction='horizontal' className='form-elements'>
          <Form.Control
            className='item-input'
            type='text'
            onChange={onChangeItem}
            placeholder='Add an item'
            value={item}
          />
          <InputGroup className='price-input'>
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control
              name='price-input'
              type='number'
              onChange={onChangePrice}
              placeholder='Add a price'
              value={price}
            />
          </InputGroup>
          <Button variant='primary' onClick={addElement} className='add-input'>
            Add
          </Button>
        </Stack>
        <br />
      </form>
    </React.Fragment>
  )
}

export default FormInput
