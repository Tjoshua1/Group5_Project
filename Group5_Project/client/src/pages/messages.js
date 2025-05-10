import React, { useState } from 'react';
import '../css/messages.css';

function Messages() {
    // Sample conversation data
    const [conversations] = useState([
        { id: 1, name: 'John Doe', lastMessage: 'Hey, how are you?', time: '10:30 AM', unread: true },
        { id: 2, name: 'Jane Smith', lastMessage: 'Meeting at 2pm', time: 'Yesterday', unread: false },
        { id: 3, name: 'Mike Johnson', lastMessage: 'Please review the documents', time: 'Monday', unread: true }
    ]);

    const [activeConversation, setActiveConversation] = useState(null);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;
        
        // In a real app, you would send this to your backend
        console.log('Message sent:', newMessage);
        setNewMessage('');
    };

    return (
        <div className="messages-container">
            <div className="conversations-sidebar">
                <div className="messages-header">
                    <h2>Messages</h2>
                    <button className="new-message-btn">+ New</button>
                </div>
                
                <div className="conversation-list">
                    {conversations.map(conv => (
                        <div 
                            key={conv.id} 
                            className={`conversation-item ${activeConversation === conv.id ? 'active' : ''} ${conv.unread ? 'unread' : ''}`}
                            onClick={() => setActiveConversation(conv.id)}
                        >
                            <div className="conversation-avatar">
                                <img src="/default_profile_img.png" alt={conv.name} />
                            </div>
                            <div className="conversation-details">
                                <h4>{conv.name}</h4>
                                <p>{conv.lastMessage}</p>
                            </div>
                            <div className="conversation-time">
                                <span>{conv.time}</span>
                                {conv.unread && <span className="unread-badge"></span>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="message-content">
                {activeConversation ? (
                    <>
                        <div className="message-header">
                            <h3>{conversations.find(c => c.id === activeConversation).name}</h3>
                        </div>
                        
                        <div className="message-history">
                            {/* Sample messages */}
                            <div className="message received">
                                <p>Hey there!</p>
                                <span className="message-time">10:30 AM</span>
                            </div>
                            <div className="message sent">
                                <p>Hi! How are you?</p>
                                <span className="message-time">10:31 AM</span>
                            </div>
                            <div className="message received">
                                <p>I'm good, thanks for asking. How about you?</p>
                                <span className="message-time">10:32 AM</span>
                            </div>
                        </div>
                        
                        <form className="message-input-form" onSubmit={handleSendMessage}>
                            <input
                                type="text"
                                placeholder="Type a message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <button type="submit">Send</button>
                        </form>
                    </>
                ) : (
                    <div className="no-conversation-selected">
                        <p>Select a conversation to start messaging</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Messages;