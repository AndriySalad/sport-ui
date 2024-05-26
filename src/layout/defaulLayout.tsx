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
import { HOME_ROUTE } from "../Routes";

const DefaultLayout = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => navigate(HOME_ROUTE)}
          >
            MySport
          </Typography>
          <Button color="inherit" component={Link} to="/training">
            Go to training
          </Button>
          <IconButton color="inherit">
            <Badge variant="standard" color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4, display: "flex", mb: 4 }}>
        <Outlet />
      </Container>
    </Box>
  );
};

export default DefaultLayout;
