import { Flux } from '../flux.jsx'
import users from './userfixtures.json'

const data = {
  users: users.reduce(function outputById (out, user) {
    out[user.id] = user
    return out
  }, {})
}

export const flux = new Flux(data)
