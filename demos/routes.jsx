
class Demo {
  render () {
    return <img src="http://demo.jpg.to" />
  }
}

class Profile {
  render () {
    return <ProfileEditWrap userId='user:1' flux={this.props.flux} />
  }
}

class Cats {
  render () {
    return <img src="http://kitty.jpg.to" />
  }
}

export default routes = (
  <Route name="default" path="/default" hander={App}>
    <Route name="profile" handler={Profile} />
    <Route name="cats" handler={Cats} />
    <DefaultRoute hander={Demo} />
  </Route>
)
