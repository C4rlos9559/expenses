import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'

import Expense from '../Expense'

const Expenses = ({ elements, deleteItem, updateItem }) => {
  if (elements.length > 0) {
    return (
      <div className='ul-list'>
        <ListGroup className='ul-items'>
          {elements.map((element) => (
            <Expense
              key={element.name}
              element={element}
              deleteItem={deleteItem}
              updateItem={updateItem}
            />
          ))}
        </ListGroup>
      </div>
    )
  }
}

export default Expenses
