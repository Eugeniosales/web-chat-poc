import React, { Component } from 'react';
import { Form, FormGroup, Button, Input } from 'reactstrap';
import './styles.css';

class Login extends Component {
    constructor(){
        super();
        this.state ={
            username: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        sessionStorage.setItem('username', this.state.username);
        this.props.history.push("/public");
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    
    render() {
        return(
            <div className="container">
                <h2 className="font-weight-bold text-center">Login</h2>
                <br />
                <div id="form" className="col-md-6">
                    <Form onSubmit={this.handleSubmit} >
                        <FormGroup>
                            <Input required={true} onChange={this.handleChange} type="text" placeholder="Enter name..." name="username" value={this.state.username} />
                        </FormGroup>
                        <Button color="info" type="submit">Entrar</Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Login;