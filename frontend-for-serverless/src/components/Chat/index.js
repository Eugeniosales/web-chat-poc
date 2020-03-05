import React, { Component } from 'react';
import FormMessage from '../FormMessage';
import ListMessages from '../ListMessages';
import socket from '../../socket';
import { Button } from 'reactstrap';
import './styles.css';

class Chat extends Component {
    constructor() {
        super();
        this.state = {
            messages: []
        }
        this.message = [];
    }

    componentDidMount () {
        socket.onmessage = (event) => {
            console.log(event.data);

            const data = JSON.parse(event.data);
            
            this.message.push(data);

            this.setState({ messages: this.message});
      }
    };
        
    render() {
        const username = sessionStorage.getItem('username');
        
        return (
            <div className="col-md-6" id="chat">
                <br /><br />
                <h2 className="font-weight-bold text-center">Bem vindo, {username}!</h2>
                <ListMessages messages={this.state.messages} />
                <FormMessage />
            </div>
        );
    }
}

export default Chat;