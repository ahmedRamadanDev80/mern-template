import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Container} from 'reactstrap'
import { Home ,Login,Edit } from './pages'
import { NavBar, ProtectedRoute} from './components'
import { Signup } from './pages/Signup'

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Container>
      <Switch>
        <ProtectedRoute path='/' component={Home} exact />
        <ProtectedRoute path="/edit" component={Edit} exact />
      </Switch>
      <Route path='/login' component={Login} exact/>
      <Route path='/signup' component={Signup} exact/>
    </Container> 
    </div>
  );
}

export default App;
