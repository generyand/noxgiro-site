import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import ChatComponent from './components/Chat/ChatComponent';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ChatComponent />
      </div>
    </Provider>
  );
}

export default App;