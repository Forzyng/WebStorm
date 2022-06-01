import axios from 'axios'

export default async function get (url, config = null) {
  return new Promise((resolve, reject) => {
    axios.get(url, config)
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
