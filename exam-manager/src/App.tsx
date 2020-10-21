// @ts-nocheck
import React from 'react';
import RouterView from './router/RouterView';
import router from './router/config'


function App() {
  return (
    <div className="App">
        <RouterView routes={router}/>
    </div>
  );
}

export default App;
