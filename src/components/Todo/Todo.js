import React, { useState, useEffect, useContext } from "react";

import {
  doc,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  serverTimestamp,
  runTransaction,
} from "firebase/firestore";
import { db } from "../../config/firebase";

//material-ui
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// import projects
import AddTaskForm from "./AddTaskForm";
import TodoList from "./TodoList";
import { userContext } from "../../pages/userContext";

//Add Todo Handler
const Todo = () => {
  const [userName] = useContext(userContext);

  const collectionName = "todo" + userName.toString();
  const collectionRef = collection(db, collectionName);

  const [createTodo, setCreateTodo] = useState("");
  const [dueDate, setDueDate] = useState([]);
  const [todos, setTodo] = useState([]);
  const [checked, setChecked] = useState([]);
  const [completedTaskCount, setCompletedTaskCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const submitTodo = async (e) => {
    e.preventDefault();

    try {
      // Add a new document in collection "todolist"
      await addDoc(collectionRef, {
        todo: createTodo,
        isChecked: false,
        duedate: dueDate,
        timestamp: serverTimestamp(),
      });
      getTodoList();
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  };
  //List Handler
  const getTodoList = async () => {
    await getDocs(collectionRef)
      .then((todo) => {
        let todoData = todo.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setTodo(todoData);
        setTaskCount(todoData.length);
        setCompletedTaskCount(
          todoData.filter((todo) => todo.isChecked === true).length
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkHandler = async (e, id) => {
    const updateSate = setTodo((state) => {
      const indexToUpdate = state.findIndex(
        (checkBox) => checkBox.id.toString() === e.target.name
      );

      let newState = state.slice();
      newState.splice(indexToUpdate, 1, {
        ...state[indexToUpdate],
        isChecked: !state[indexToUpdate].isChecked,
      });

      setTodo(newState);
      setCompletedTaskCount(
        newState.filter((todo) => todo.isChecked === true).length
      );
      return newState;
    });

    // Persisting the checked value
    try {
      const docRef = doc(db, collectionName, e.target.name);
      await runTransaction(db, async (transaction) => {
        const todoDoc = await transaction.get(docRef);
        if (!todoDoc.exists()) {
          throw "Document does not exist!";
        }
        const newValue = !todoDoc.data().isChecked;
        transaction.update(docRef, { isChecked: newValue });
      });
    } catch (error) {
      console.log("Transaction failed: ", error);
    }
  };

  const updateTodo = async (newTodo, id) => {
    // e.preventDefault();
    const documentRef = doc(db, collectionName, id);
    try {
      await updateDoc(documentRef, {
        todo: newTodo,
      });
      getTodoList();
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  };
  const deleteTodo = async (id) => {
    try {
      window.confirm("Are you sure you want to delete this Todo?");
      const documentRef = doc(db, collectionName, id);
      await deleteDoc(documentRef);
      window.confirm("The task deleted");
      getTodoList();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTodoList();
  }, []);

  return (
    <>
      <div>
        <Grid item xs={12}>
          <AddTaskForm
            createTodo={createTodo}
            setCreateTodo={setCreateTodo}
            dueDate={dueDate}
            setDueDate={setDueDate}
            submitTodo={submitTodo}
          />

          <Card
            variant="outlined"
            sx={{ p: 1, bgcolor: "background.white", borderRadius: 5 }}
          >
            <Typography
              variant="subtitle1"
              component="div"
              sx={{
                p: 2,
                pb: 0,
                fontSize: "14px",
              }}
            >
              You have <b>{taskCount}</b> tasks assigned.
            </Typography>

            <Typography
              variant="subtitle1"
              component="div"
              sx={{
                p: 2,
                pt: 0,
                fontSize: "14px",
              }}
            >
              Completed Tasks:{completedTaskCount}
            </Typography>

            <TodoList
              todos={todos}
              setTodo={setTodo}
              checkHandler={checkHandler}
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
            />
          </Card>
        </Grid>
      </div>
    </>
  );
};

export default Todo;
