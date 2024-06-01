import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Box,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  CircularProgress,
  Link as MuiLink,
} from "@mui/material";
import { useAuth } from "../utils/AuthContext";
import { IUserListItem, fetchAthletes, fetchTrainers } from "../api/TrainerApi";

const UserListPage = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<IUserListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      let data;
      if (user?.role === "ROLE_TRAINER") {
        data = await fetchAthletes();
      } else {
        data = await fetchTrainers();
      }
      setUsers(data);
      setLoading(false);
    };
    loadUsers();
  }, [user?.role]);

  if (loading) {
    return (
      <Container sx={{ mt: 4 }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {user?.role === "ROLE_TRAINER" ? "Athletes" : "Trainers"}
        </Typography>
        <List>
          {users.map((user) => (
            <ListItem key={user.id} sx={{ mb: 2 }}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  {user.firstName.charAt(0)}
                  {user.lastName.charAt(0)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`${user.firstName} ${user.lastName}`}
                secondary={
                  <>
                    <Typography variant="body2" color="textSecondary">
                      Username: {user.userName || "Not specified"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Email: {user.email}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Phone: {user.phone || "Not specified"}
                    </Typography>
                    <MuiLink
                      href={
                        user?.role == "ROLE_TRAINER"
                          ? `/trainer/${user.id}`
                          : `/athlete/${user.id}`
                      }
                      variant="body2"
                      sx={{ display: "block", mt: 1 }}
                    >
                      View Profile
                    </MuiLink>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default UserListPage;
