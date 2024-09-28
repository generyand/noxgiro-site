import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import ChatComponent from './components/Chat/ChatComponent';
import ChatIcon from './components/Chat/ChatIcon';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  return (
    <Provider store={store}>
      <div className="App">
        {isChatOpen && <ChatComponent onClose={toggleChat} />}
        <ChatIcon onClick={toggleChat} />
      </div>
    </Provider>
  );
}

export default App;