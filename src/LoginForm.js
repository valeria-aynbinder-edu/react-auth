import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap';
import axios from 'axios';

export class LoginForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: "",
            password: "",
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit() {
        // window.localStorage.setItem("username", this.state.username)
        // window.localStorage.setItem("password", this.state.password)
        axios.post('http://127.0.0.1:8000/auth_app/api-token-auth/', {
            username: this.state.username,
            password: this.state.password
        })
        .then(result => {
            window.localStorage.setItem("token", result.data.token)
            console.log(result)
        })
        .catch(error => window.alert(error))
        this.props.onHide()
    }

    render () {
        return(
        <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
        <Modal.Title>New Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Text>
                    <Form.Control 
                        type="text" placeholder="username" 
                        value={this.state.username}
                        onChange={(event) => this.setState({username: event.target.value})}/>
                </Form.Text>
            </Form.Group>
    
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Text>
                    <Form.Control 
                        type="password" placeholder="password" 
                        value={this.state.password}
                        onChange={(event) => this.setState({password: event.target.value})}/>
                </Form.Text>
            </Form.Group>

        </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={this.props.onLoginClose}>
            Cancel
        </Button>
        <Button variant="primary" 
            onClick={this.handleSubmit}>
            Login
        </Button>
        </Modal.Footer>
        </Modal> 
        )
    
    }
}