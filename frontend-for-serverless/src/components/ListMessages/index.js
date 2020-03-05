import React, { Component } from 'react';
import './styles.css';

class ListMessages extends Component {
    
    render() {        

        const { messages } = this.props;

        return (
            <div id="box" className="card">
                <div id="messages" className="card-block">
                    {messages.map(message => (
                        <div  className="message">
                            <strong> {message.username}: </strong>
                            { message.message }
                        </div>
                    ))}

                </div>
            </div>
        );
    }        
}

export default ListMessages;