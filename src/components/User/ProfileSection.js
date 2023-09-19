import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";

// firebase imports
import { getAuth } from "firebase/auth";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Card,
  CardHeader,
  CardActions,
  Button,
  Typography,
} from "@mui/material";

import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";

// project imports
import User1 from "../../assets/images/users/user-round.svg";
import { userContext } from "../../pages/userContext";

const ProfileSection = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const auth = getAuth();
  const [userName, setUserName] = useContext(userContext);

  const navigate = useNavigate();
  /**
   * anchorRef is used on different componets and specifying one type leads to other components throwing an error
   * */
  const anchorRef = useRef(null);

  const handleLogout = () => {
    auth.signOut();
    setUserName(null);
    navigate("/login");
  };

  return (
    <div>
      <Card
        variant="outlined"
        sx={{ mb: 2, bgcolor: "background.white", borderRadius: 5 }}
      >
        <CardHeader
          title="Hello,"
          subheader={
            <Typography sx={{ color: "white" }}>
              {userName} currently logged in.
            </Typography>
          }
        />
        <Avatar
          src={User1}
          sx={{
            ...theme.typography.mediumAvatar,
            margin: "8px 0 8px 8px !important",
            cursor: "pointer",
          }}
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          color="inherit"
        />

        <CardActions>
          <Button onClick={handleLogout}>Log out</Button>
        </CardActions>
      </Card>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Card
          variant="outlined"
          sx={{
            p: 1,
            mb: 2,
            bgcolor: "background.white",
            borderRadius: 5,
          }}
        >
          <DemoContainer
            components={[
              "DatePicker",
              "MobileDatePicker",
              "DesktopDatePicker",
              "StaticDatePicker",
            ]}
          >
            <DemoItem label="Today is">
              <StaticDatePicker defaultValue={dayjs()} />
            </DemoItem>
          </DemoContainer>
        </Card>
      </LocalizationProvider>
    </div>
  );
};

export default ProfileSection;
