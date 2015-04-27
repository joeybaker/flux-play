import { Actions, Store, Flummox } from 'flummox'
import immstruct from 'immstruct'
import Immutable from 'immutable'

export class UserActions extends Actions {
  setEmail (content) {
    return content // automatically dispatched
  }
  setPhone (content) {
    return content // automatically dispatched
  }
  set (content) {
    return content
  }
}

export class UserStore extends Store {
  constructor (flux) {
    super()

    const userActions = flux.getActions('users')
    this.register(userActions.setEmail, this.setEmail)
    this.register(userActions.setPhone, this.setPhone)
    this.register(userActions.set, this.set)

    // a reference is like a cursor, but it always points to the freshest data
    this.state = flux.state.reference(['users'])
    this.observer = this.state.observe(this.forceUpdate.bind(this))
  }

  setEmail (content) {
    this.state.cursor([content.id]).set('email', content.email)
  }

  setPhone (content) {
    this.set(content.id, 'phone', content.phone)
  }

  get (id) {
    return this.state.cursor(id).toJSON()
  }

  set (id, attr, value) {
    if (typeof attr === 'string') this.state.cursor([id, attr]).update(() => value)
    else {
      this.state.cursor([id.id]).update((current) => current.mergeDeep(id))
    }
  }

}

export class Flux extends Flummox {
  constructor (initialData) {
    super()

    this.state = immstruct.withHistory('stores', initialData)
    this.createActions('users', UserActions)
    this.createStore('users', UserStore, this)
  }

}
