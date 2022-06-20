import axios from 'axios'

const URL = 'https://chipper-semolina-a893f4.netlify.app:3000'

let axiosConfig = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Credentials': 'true',
  },
}

const getInitial = async (body) => {
  let endpoint = `${URL}`
  const response = await axios.get(endpoint, body, axiosConfig)
  return {
    status: response.status,
    data: response.data,
  }
}

const register = async (body) => {
  try {
    let endpoint = `${URL}/user/register`
    const response = await axios.post(endpoint, body, axiosConfig)
    return {
      status: response.status,
      data: response.data,
    }
  } catch (err) {
    console.error(err.stack)
    return {
      status: err.response.status,
      message: err.response.data.error,
    }
  }
}

const login = async (body) => {
  try {
    let endpoint = `${URL}/user/login`
    const response = await axios.post(endpoint, body, axiosConfig)
    return {
      status: response.status,
      data: response.data,
    }
  } catch (err) {
    console.error(err.stack)
    return {
      status: err.response.status,
      message: err.response.data.error,
    }
  }
}

const getPieces = async (body) => {
  try {
    let endpoint = `${URL}/user/getAllPieces`
    const response = await axios.post(endpoint, body, axiosConfig)
    return {
      status: response.status,
      data: response.data,
    }
  } catch (err) {
    console.error(err.stack)
    return {
      status: err.response.status,
      message: err.response.data.error,
    }
  }
}

const getDemandByClient = async (clientId) => {
  try {
    let endpoint = `${URL}/demand/getDemandByClient?clientId=${clientId}`
    const response = await axios.get(endpoint)
    return {
      status: response.status,
      data: response.data,
    }
  } catch (err) {
    console.error(err.stack)
    return {
      status: err.response.status,
      message: err.response.data.error,
    }
  }
}

const getAllDemands = async () => {
  try {
    let endpoint = `${URL}/demand/getAllDemands`
    const response = await axios.get(endpoint)
    return {
      status: response.status,
      data: response.data,
    }
  } catch (err) {
    console.error(err.stack)
    return {
      status: err.response.status,
      message: err.response.data.error,
    }
  }
}

const editDemand = async (item) => {
  try {
    let endpoint = `${URL}/demand/${item.id}`
    const response = await axios.patch(endpoint, item)
    return {
      status: response.status,
      data: response.data,
    }
  } catch (err) {
    console.error(err.stack)
    return {
      status: err.response.status,
      message: err.response.data.error,
    }
  }
}

const create = async (body) => {
  try {
    let endpoint = `${URL}/demand/create`
    const response = await axios.post(endpoint, body)
    return {
      status: response.status,
      data: response.data,
    }
  } catch (err) {
    console.error(err.stack)
    return {
      status: err.response.status,
      message: err.response.data.error,
    }
  }
}

const getAllUsers = async () => {
  try {
    let endpoint = `${URL}/user/getAllUsersNonAdmins`
    const response = await axios.get(endpoint)
    return {
      status: response.status,
      data: response.data,
    }
  } catch (err) {
    console.error(err.stack)
    return {
      status: err.response.status,
      message: err.response.data.error,
    }
  }
}

export {
  register,
  getInitial,
  login,
  getPieces,
  getDemandByClient,
  getAllDemands,
  editDemand,
  create,
  getAllUsers,
}
