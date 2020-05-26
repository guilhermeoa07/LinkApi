const axios = require('axios')
const js2xmlparser = require("js2xmlparser")

require('dotenv').config()

const env = process.env

function getDateString(date) {
  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()
  return dateFormatted = year + '/' + (month++) + '/' + day
}

async function blingRequest(obj, request, method = 'GET') {
  const xml = js2xmlparser.parse(request, obj)

  let params = {
    baseURL: env.BLING_ENDPOINT,
    url: `/${request}/json`,
    method,
    params: {
      apikey: env.API_KEY_BLING,
    }
  }

  if (method == 'POST') {
    params = {
      ...params,
      params: {
        ...params.params,
        xml
      }
    }
  }

  try {
    const response = await axios(params)

    return response
  } catch (error) {
    console.error(error)
  }
}

async function pipedriveRequest(method, type) {
  try {
    const params = {
      baseURL: env.PIPEDRIVE_ENDPOINT,
      url: type,
      method,
      params: {
        status: 'won',
        api_token: env.API_KEY_PIPEDRIVE
      }
    }
    const response = await axios(params)
    return response
  } catch (err) {
    console.log(err)
  }
}

async function getDealsForDay(date) {
  try {
    const params = {
      baseURL: env.PIPEDRIVE_ENDPOINT,
      url: type,
      method,
      params: {
        status: 'won',
        api_token: env.API_KEY_PIPEDRIVE,
        start_date: getDateString(date)
      }
    }
    const response = await axios(params)
    return response
  } catch (err) {
    console.log(err)
  }
}

module.exports = { blingRequest, pipedriveRequest, getDealsForDay }