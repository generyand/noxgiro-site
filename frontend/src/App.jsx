import React, { useState } from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Layout/Header";
import ChatComponent from "./components/Chat/ChatComponent";
import ChatIcon from "./components/Chat/ChatIcon";
import Home from "./pages/Home";

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  return (
    <Provider store={store}>
      <Router>
        <div className="flex flex-col App">
          <Header />
          <main className=""> {/* Add padding-top to account for fixed header */}
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </main>
          {isChatOpen && <ChatComponent onClose={toggleChat} />}
          <ChatIcon onClick={toggleChat} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
