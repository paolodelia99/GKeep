import React from 'react';
import './App.css';
import DashBoard from "./components/Dashboard";

import {Provider} from 'react-redux';
import store from "./store";

function App() {
  return (
      <Provider store={store}>
          <div className="App">
              <DashBoard/>
          </div>
      </Provider>
  );
}

export default App;
