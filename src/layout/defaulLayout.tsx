import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  IconButton,
  Badge,
  Button,
} from "@mui/material";
import { Notifications as NotificationsIcon } from "@mui/icons-material";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

const DefaultLayout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            MySport
          </Typography>
          <Button color="inherit" component={Link} to={"/trainings"}>
            Go to training
          </Button>
          <IconButton
            color="inherit"
            onClick={() => navigate("/notifications")}
          >
            {user && (
              <Badge
                variant={user?.notificationCount > 0 ? "dot" : "standard"}
                color="error"
              >
                <NotificationsIcon />
              </Badge>
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
        <Container sx={{ mt: 4, display: "flex", mb: 4, overflow: "auto" }}>
          <Outlet />
        </Container>
      </Box>
    </>
  );
};

export default DefaultLayout;
