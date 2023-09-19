import React, { useState, useEffect } from "react";

import dayjs from "dayjs";
import Moment from "react-moment";
import moment from "moment";

import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";

const AddTaskForm = ({
  createTodo,
  setCreateTodo,
  dueDate,
  setDueDate,
  submitTodo,
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const duedateChange = async (newValue) => {
    setDueDate(newValue.format());
    newValue = moment(newValue);
  };

  const handleFocus = (e) => {
    setCreateTodo(e.target.value);
    validate();
  };
  const handleChange = (e) => {
    setCreateTodo(e.target.value);
    validate();
  };

  const handleOnclick = (e) => {
    e.preventDefault();
    validate();
    if (!errorMessage) {
      submitTodo(e);
      setCreateTodo(" ");
    }
  };

  const validate = () => {
    //createTodo field validation
    if (createTodo) {
      setErrorMessage(false);
    } else {
      setErrorMessage("Empty field!");
    }
  };
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Card
          variant="outlined"
          sx={{ p: 1, mb: 2, bgcolor: "background.white", borderRadius: 5 }}
        >
          <DemoContainer
            components={[
              "DatePicker",
              "MobileDatePicker",
              "DesktopDatePicker",
              "StaticDatePicker",
            ]}
          >
            <DemoItem label="NEW TASK">
              <TextField
                id="filled-basic-task"
                fullWidth
                label="Add your work"
                value={createTodo}
                name="createTodo"
                error={errorMessage ? true : false}
                helperText={errorMessage}
                onFocus={handleFocus}
                onChange={handleChange}
              />
            </DemoItem>
            <DemoItem label="Due date">
              <DatePicker
                label="Select the date"
                value={dayjs()}
                error={errorMessage ? true : false}
                helperText={errorMessage}
                onChange={(newValue) => duedateChange(newValue)}
              />
            </DemoItem>
            <DemoItem>
              <Button
                variant="contained"
                disableElevation
                onClick={handleOnclick}
              >
                Add your task
              </Button>
            </DemoItem>
          </DemoContainer>
        </Card>
      </LocalizationProvider>
    </div>
  );
};

export default AddTaskForm;
