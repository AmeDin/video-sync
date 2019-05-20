import React from 'react';
import { Provider } from 'react-redux';

import Video from './components/Video';
import store from './stores/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Video />
      </div>
     </Provider>
  );
}

export default App;
