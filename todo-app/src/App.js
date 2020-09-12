import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
//import Button from '@material-ui/core/Button';
//import FormControl from '@material-ui/core/FormControl';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import firebase from 'firebase';
import db from './firebase';
import Todo from './Todo';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // when the app loads, we need to listen to the database and fetch new todos as they get added/removes
  useEffect(() => {
    //this code here... fires when the app.js loads

    db.collection('todos')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        //console.log(snapshot.docs.map((doc) => doc.data()));
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, task: doc.data().task }))
        );
      });
  }, []);

  const addTodo = (event) => {
    // this will fire off when we click the button
    event.preventDefault(); //will stop the REFRESH

    db.collection('todos').add({
      task: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput(''); //clear up the input after clicking add todo button
  };

  return (
    <div className="App">
      <h1>Hello Friends!</h1>

      <form>
        <FormControl>
          <InputLabel>Write a Todo</InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </FormControl>
        <Button
          disabled={!input}
          type="submit"
          onClick={addTodo}
          variant="contained"
          color="primary"
        >
          Add Todo
        </Button>
      </form>

      <ul>
        {todos.map((todo) => (
          <Todo task={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
