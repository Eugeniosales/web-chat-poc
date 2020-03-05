import React, { Component  } from 'react';
import Chat from '../../components/Chat';

class PublicChat extends Component {
    render() {
        return (
            <div className="container">
                <Chat />
            </div>
        );
    }
}

export default PublicChat;