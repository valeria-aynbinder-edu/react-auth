import logo from './logo.svg';
import './App.css';
import React from 'react';
import axios from 'axios';
import { LoginForm } from './LoginForm';
import 'bootstrap/dist/css/bootstrap.css';

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      'show_login_form': false
    }
  }

  onSignoutClick() {
    window.localStorage.removeItem("token")
  }

  onInvalidateToken() {
    const token = window.localStorage.getItem("token")
    console.log("token: "+ token)
    const headers = {'Authorization': 'Token ' + token}
    axios.post('http://127.0.0.1:8000/auth_app/signout/', {}, {headers: headers})
    .then(response => console.log(response.data))
    .catch(error => window.alert(error))
  }

  onPublicClick() {
    console.log('clicked public')
    axios.get('http://127.0.0.1:8000/auth_app/public')
    .then(response => console.log(response.data))
    .catch(error => window.alert(error))
  }

  onPrivateClick() {
    console.log('clicked private')
    // var encodedData = btoa('valeria:valeria', 'base64');
    // const headers = {'Authorization': 'Basic ' + encodedData}
    // axios.get('http://127.0.0.1:8000/auth_app/private', {headers: headers})
    // .then(response => console.log(response.data))
    // .catch(error => window.alert(error))
    
    // const username = window.localStorage.getItem("username")
    // const password = window.localStorage.getItem("password")
    // var encodedData = btoa(username+':'+password, 'base64');
    // var encodedData = btoa('valeria:valeria', 'base64');
    // var encodedData = Buffer.from('Basic valeria:valeria', 'base64')

    const token = window.localStorage.getItem("token")
    const headers = {'Authorization': 'Token ' + token}
    axios.get('http://127.0.0.1:8000/auth_app/private', {headers: headers})
    .then(response => console.log(response.data))
    .catch(error => window.alert(error))
  }

  render() {
    return (
      <div>

        <button onClick={() => this.setState({show_login_form: true})}>Open Login Form</button>
        <button onClick={this.onPublicClick.bind(this)}>Test Public</button>
        <button onClick={this.onPrivateClick.bind(this)}>Test Private</button>
        <button onClick={this.onSignoutClick.bind(this)}>Signout</button>
        <button onClick={this.onInvalidateToken.bind(this)}>Invalidate token</button>
        <LoginForm show={this.state.show_login_form} onHide={() => this.setState({show_login_form: false})}/>
      </div>
    );
  }
}

export default App;
