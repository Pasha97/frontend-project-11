import axios from 'axios'
import { parserRSS } from '../utils/parser.js'

export const loadRssFeed = (url) => {
  const baseUrl = `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`

  return axios.get(baseUrl)
    .then((response) => {
      const { contents } = response.data

      // if (status?.http_code !== 200) {
      //   throw new Error('messages.errors.network')
      // }

      try {
        return parserRSS(contents)
      }
      catch (err) {
        err.isParseError = true
        throw err
      }
    }).catch((err) => {
      if (err.isParseError) {
        throw new Error('messages.errors.invalidRss')
      }

      throw new Error('messages.errors.network')
    })
}
