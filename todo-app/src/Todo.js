import React, { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import './Todo.css';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  Avatar,
  Button,
} from '@material-ui/core';
import db from './firebase';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Todo(props) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState();
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };
  const updateTodo = () => {
    //update todos with the new task input
    db.collection('todos').doc(props.task.id).set(
      {
        task: input,
      },
      { merge: true }
    );
    setOpen(false);
  };

  return (
    <div>
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <div className={classes.paper}>
          <h1>Update a Task</h1>
          <input
            placeholder={props.task.task}
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <Button onClick={updateTodo}>UPDATE Todo</Button>
        </div>
      </Modal>
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar></Avatar>
          </ListItemAvatar>
          <ListItemText primary={props.task.task} secondary="Dummy Deadline" />
        </ListItem>
        <button onClick={handleOpen}>EDIT</button>
        <DeleteIcon
          onClick={(event) =>
            db.collection('todos').doc(props.task.id).delete()
          }
        />
      </List>
    </div>
  );
}

export default Todo;
