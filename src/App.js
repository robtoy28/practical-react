import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import TodoList from './todolist';
import DumbModule from './dumbModule';

function App() {
  return (
    <div>
      <div>
        <header className="App-header">
        </header>
          <TodoList />
          <DumbModule
            text="This is a DumbModule"
          />
      </div>
    </div>
  );
}


export default App;
