import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";

//firebase
import {
  doc,
  collection,
  getDocs,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../config/firebase";

//material-ui
import EditIcon from "@mui/icons-material/Edit";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import { userContext } from "../../pages/userContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #fff",
  boxShadow: 24,
  p: 4,
};

const EditTodo = ({ todo, id, setTodo }) => {
  const [newTodo, setNewTodo] = useState("");
  const [checked, setChecked] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [userName] = useContext(userContext);
  const collectionName = "todo" + userName.toString();
  const collectionRef = collection(db, collectionName);

  const updateTodo = async (e) => {
    e.preventDefault();

    const documentRef = doc(db, collectionName, id);
    try {
      await updateDoc(documentRef, {
        todo: newTodo,
      });
      getTodoList();

      setOpen(false);
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  };

  const getTodoList = async (event) => {
    await getDocs(collectionRef)
      .then((todo) => {
        let todoData = todo.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setTodo(todoData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTodoList();
  }, []);

  return (
    <>
      <div>
        <Button
          onClick={handleOpen}
          variant="text"
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{ bgcolor: "background.paper" }}
        >
          <EditIcon />
        </Button>

        <Modal
          open={open}
          onClose={handleClose}
          class="modal fade"
          id={`id${id}`}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          tabindex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <Box sx={style}>
            <div className="modal-header">
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Update Todo Details
              </Typography>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body">
              <TextField
                id="filled-basic-task"
                className="form-control"
                color="white"
                background="white"
                fullWidth
                defaultValue={todo}
                onChange={(e) => setNewTodo(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={updateTodo}
              >
                Update Todo
              </button>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default EditTodo;
