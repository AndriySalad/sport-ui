import { Route, Routes } from "react-router-dom";
import {
  EDIT_PROFILE_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  NOTIFICATIONS_ROUTE,
  REGISTER_ROUTE,
  TRAINING_ROUTE,
} from "./Routes";
import Login from "./pages/Login";
import RequireAuth from "./hoc/RequireAuth";
import UserProfilePage from "./pages/UserProfilePage";
import Registration from "./pages/RegistrationPage";
import DefaultLayout from "./layout/defaulLayout";
import EditUserProfilePage from "./pages/UserProfileConfigPage";
import TrainingsPage from "./pages/TrainingsPage";
import NotificationsPage from "./pages/NotificationsPage";

const Router = () => {
  return (
    <Routes>
      <Route path={LOGIN_ROUTE} element={<Login />} />
      <Route path={REGISTER_ROUTE} element={<Registration />} />
      <Route
        path={HOME_ROUTE}
        element={
          <RequireAuth>
            <DefaultLayout />
          </RequireAuth>
        }
      >
        <Route index element={<UserProfilePage />} />
        <Route path={EDIT_PROFILE_ROUTE} element={<EditUserProfilePage />} />
        <Route path={TRAINING_ROUTE} element={<TrainingsPage />} />
        <Route path={NOTIFICATIONS_ROUTE} element={<NotificationsPage />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Route>
    </Routes>
  );
};

export default Router;
