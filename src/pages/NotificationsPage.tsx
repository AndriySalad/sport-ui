import React, { useState, useEffect } from "react";
import {
  Container,
  List,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Divider,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import HistoryIcon from "@mui/icons-material/History";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import {
  fetchNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
  fetchNotificationHistory,
  handleRequestResponse,
  INotification,
} from "../api/NotificationApi";
import { useAuth } from "../utils/AuthContext";
import dayjs from "dayjs";

const NotificationsPage: React.FC = () => {
  const { user } = useAuth();
  const userId = user?.id;
  const userRole = user?.role;

  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    const data = await fetchNotifications();
    setNotifications(data || []);
    setShowHistory(false);
  };

  const loadNotificationHistory = async () => {
    const data = await fetchNotificationHistory();
    setNotifications(data || []);
    setShowHistory(true);
  };

  const handleNotificationClick = async (notificationId: number) => {
    await markNotificationAsRead(notificationId);
    loadNotifications();
  };

  const handleAccept = async (notification: INotification) => {
    const action =
      userRole === "ROLE_TRAINER" ? "accept-trainee" : "accept-trainer";
    await handleRequestResponse(notification.id, action);
    loadNotifications();
  };

  const handleDecline = async (notification: INotification) => {
    const action =
      userRole === "ROLE_TRAINER" ? "reject-trainee" : "reject-trainer";
    await handleRequestResponse(notification.id, action);
    loadNotifications();
  };

  const handleMarkAllAsRead = async () => {
    await markAllNotificationsAsRead(userId);
    loadNotifications();
  };

  const renderNotificationActions = (notification: INotification) => {
    switch (notification.type) {
      case "TO_BE_COACH":
      case "TO_BE_ATHLETE":
        return (
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              startIcon={<CheckIcon />}
              onClick={() => handleAccept(notification)}
            >
              Accept
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<CloseIcon />}
              onClick={() => handleDecline(notification)}
            >
              Decline
            </Button>
          </CardActions>
        );
      default:
        return null;
    }
  };

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h4">Notifications</Typography>
        <Box>
          <Button
            variant="outlined"
            startIcon={<HistoryIcon />}
            onClick={showHistory ? loadNotifications : loadNotificationHistory}
          >
            {showHistory ? "Back to Current" : "View History"}
          </Button>
          <Button
            variant="outlined"
            startIcon={<DoneAllIcon />}
            onClick={handleMarkAllAsRead}
            sx={{ ml: 2 }}
          >
            Mark All as Read
          </Button>
        </Box>
      </Box>
      <List>
        {Array.isArray(notifications) && notifications.length > 0 ? (
          notifications.map((notification) => (
            <Card
              key={notification.id}
              sx={{ mb: 2, bgcolor: notification.viewed ? "white" : "#f5f5f5" }}
            >
              <CardContent
                onClick={() => handleNotificationClick(notification.id)}
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ bgcolor: "#1976d2", mr: 2 }}>
                  {notification.sender.firstName.charAt(0)}
                </Avatar>
                <Box flexGrow={1}>
                  <Typography variant="h6">{notification.title}</Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mb: 1 }}
                  >
                    {notification.sender.firstName}{" "}
                    {notification.sender.lastName} ({notification.sender.email})
                  </Typography>
                  <Typography variant="body2">
                    {notification.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {dayjs(notification.date).format("DD MMM YYYY, h:mm A")}
                  </Typography>
                </Box>
              </CardContent>
              {renderNotificationActions(notification) && <Divider />}
              {renderNotificationActions(notification)}
            </Card>
          ))
        ) : (
          <Typography>No notifications available.</Typography>
        )}
      </List>
    </Container>
  );
};

export default NotificationsPage;
