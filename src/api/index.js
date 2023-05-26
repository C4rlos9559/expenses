import axios from 'axios'
const baseURL = process.env.REACT_APP_BASE_URL

const normalizeURL = (str) => str.replace(/ /g, '-')

export const getItems = () => {
  const response = axios
    .get(baseURL)
    .then((response) => response.data)
    .catch((error) => {
      console.error(error.response.data.message)
    })
  return response
}

export const createItem = ({ name, price }) => {
  const response = axios
    .post(baseURL, {
      name,
      price,
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error(error.response.data.message)
    })
  return response
}

export const updateItem = ({ newName, price }, name) => {
  const response = axios
    .put(`${baseURL}/${normalizeURL(name)}`, {
      name: newName || name,
      price,
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error(error.response.data.message)
    })
  return response
}

export const deleteItem = (name) => {
  const response = axios
    .delete(`${baseURL}/${normalizeURL(name)}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error(error.response.data.message)
    })
  return response
}
