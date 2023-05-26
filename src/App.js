import logo from "./logo.svg";
import React, { Component } from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import ListGroup from "react-bootstrap/ListGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import { InputGroup } from "react-bootstrap";
import "./css/styles.css";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const Header = () => {
  return <h1>Budget planner</h1>;
};
const Expenses = ({ elements, deleteItem, updateItem }) => {
  if (elements.length > 0) {
    return (
      <div class="ul-list">
        <ListGroup id="ul-items">
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
    );
  }
};
const Expense = ({ element, index, deleteItem, updateItem }) => {
  const [reading, setReading] = React.useState(true);
  const [editItemValue, setEditItemValue] = React.useState(element.item);
  const [editItemPrice, setEditItemPrice] = React.useState(element.price);
  const onDelete = () => {
    reading ? deleteItem(index) : setReading(!reading);
  };
  const onUpdate = () => {
    if (reading) {
      setReading(!reading);
      setEditItemValue(element.item);
      setEditItemPrice(element.price);
    } else {
      console.log(editItemValue + " -> " + editItemPrice);
      updateItem(index, editItemValue, editItemPrice);
      setReading(!reading);
    }
  };
  const onChangeItemValue = (event) => {
    setEditItemValue(event.target.value);
  };
  const onChangeItemPrice = (event) => {
    setEditItemPrice(event.target.value);
  };
  return (
    <React.Fragment>
      <ListGroup.Item id="li-container">
        <Stack direction="horizontal" id="li-items" gap={2}>
          <ListGroup horizontal id="item-content">
            <ListGroup.Item as="li" id="item-text">
              {reading ? (
                element.item
              ) : (
                <Form.Control
                  id="item-value"
                  type="text"
                  onChange={onChangeItemValue}
                  placeholder={element.item}
                  value={editItemValue}
                />
              )}
            </ListGroup.Item>
            <ListGroup.Item as="li" id="item-price">
              {reading ? (
                `$ ${element.price}`
              ) : (
                <Form.Control
                  type="text"
                  onChange={onChangeItemPrice}
                  placeholder={element.price}
                  value={editItemPrice}
                />
              )}
            </ListGroup.Item>
          </ListGroup>
          <div class="btn-options">
            <ButtonGroup aria-label="options">
              <Button variant="success" id="update-item" onClick={onUpdate}>
                {reading ? "Update" : "Save"}
              </Button>
              <Button variant="danger" id="delete-item" onClick={onDelete}>
                {reading ? "Delete" : "Cancel"}
              </Button>
            </ButtonGroup>
          </div>
        </Stack>
      </ListGroup.Item>
    </React.Fragment>
  );
};
const FormInput = ({ onAdd }) => {
  const [item, setItem] = React.useState("");
  const [price, setPrice] = React.useState("");
  const onChangeItem = (event) => {
    setItem(event.target.value);
  };
  const onChangePrice = (event) => {
    setPrice(event.target.value);
  };
  async function addElement(event) {
    event.preventDefault();
    if (item.trim() !== "" && price > 0) {
      onAdd({ item, price });
      setItem(""); //Clear field
      setPrice(""); //Clear field
    } else {
      alert("Elemento no válido");
    }
  }
  return (
    <form id="form-Input">
      <Stack direction="horizontal" id="form-elements">
        <Form.Control
          id="item-input"
          type="text"
          onChange={onChangeItem}
          placeholder="Add an item"
          value={item}
        />
        <InputGroup id="price-input">
          <InputGroup.Text>$</InputGroup.Text>
          <Form.Control
            name="price-input"
            type="number"
            onChange={onChangePrice}
            placeholder="Add a price"
            value={price}
          />
        </InputGroup>
        <Button variant="primary" onClick={addElement} id="add-input">
          Add
        </Button>
      </Stack>
      <br />
    </form>
  );
};
const App = () => {
  const [items, setItems] = React.useState([]);
  const deleteItem = (index) => {
    let temp = [...items];
    temp.splice(index, 1);
    setItems(temp);
  };
  const updateItem = (index, newItem, newPrice) => {
    let temp = [...items];
    temp[index].item = newItem;
    temp[index].price = newPrice;
    setItems(temp);
  };
  const onAdd = (element) => {
    setItems([...items, element]);
  };
  return (
    <div id="main-container">
      <React.Fragment>
        <Header />
        <FormInput onAdd={onAdd} />
        <br />
        <Expenses
          elements={items}
          deleteItem={deleteItem}
          updateItem={updateItem}
        />
      </React.Fragment>
    </div>
  );
};
export default App;
