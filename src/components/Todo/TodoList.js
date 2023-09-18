import React, { useState, useEffect } from "react";

import { Button } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Typography from "@mui/material/Typography";
import moment from "moment";

//import project
import EditTodo from "./EditTodo";

const TodoList = ({ todos, checkHandler, setTodo, deleteTodo }) => {
  return (
    <div>
      <List
        sx={{ width: "100%", bgcolor: "background.white" }}
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            sx={{ bgcolor: "background.white" }}
          >
            Things to do
          </ListSubheader>
        }
      >
        {todos.map(({ todo, id, isChecked, duedate, timestamp }) => (
          <ListItem
            key={id}
            disablePadding
            spacing={20}
            sx={{ mb: 2, bgcolor: "background.paper", borderRadius: 5 }}
          >
            <ListItemButton disableRipple>
              <ListItemIcon>
                <Checkbox
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={<CheckCircleIcon />}
                  type="checkbox"
                  defaultChecked={isChecked}
                  name={id}
                  label={todo}
                  onChange={(event) => checkHandler(event, id)}
                />
              </ListItemIcon>
              <ListItemText>
                <Typography
                  className={isChecked ? "checked" : ""}
                  variant="subtitle1"
                  component="div"
                  sx={{
                    fontSize: "14px",
                  }}
                >
                  {todo}
                </Typography>
                <Typography
                  className={isChecked ? "checked" : ""}
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                  sx={{
                    fontSize: "12px",
                  }}
                >
                  Due date: {moment(duedate).format("MMM Do")}
                </Typography>
              </ListItemText>

              <ListItemIcon>
                {" "}
                <EditTodo todo={todo} id={id} setTodo={setTodo} />
              </ListItemIcon>
              <ListItemIcon>
                <DeleteIcon onClick={() => deleteTodo(id)} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default TodoList;
