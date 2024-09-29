import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';

import Header from './components/Layout/Header';
import Hero from './components/Landing/Hero';
import MainContent from './components/Landing/MainContent';
import Footer from './components/Layout/Footer';
import ChatComponent from './components/Chat/ChatComponent';
import ChatIcon from './components/Chat/ChatIcon';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  return (
    <Provider store={store}>
      <div className="flex flex-col min-h-screen App">
        <Header />
        <main className="flex-grow">
          <Hero />
          <MainContent />
        </main>
        <Footer />
        {isChatOpen && <ChatComponent onClose={toggleChat} />}
        <ChatIcon onClick={toggleChat} />
      </div>
    </Provider>
  );
}

export default App;