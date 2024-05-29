import { Route, Routes } from "react-router-dom";
import {
  ATHLETE_PROFILE,
  ATHLETE_TRAINING_ROUTE,
  EDIT_PROFILE_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  MY_ATHLETES,
  NOTIFICATIONS_ROUTE,
  REGISTER_ROUTE,
  STRAVA_CALLBACK,
  TRAINER_PROFILE,
  TRAINING_ROUTE,
  USERS_LIST,
} from "./Routes";
import Login from "./pages/Login";
import RequireAuth from "./hoc/RequireAuth";
import UserProfilePage from "./pages/UserProfilePage";
import Registration from "./pages/RegistrationPage";
import DefaultLayout from "./layout/defaulLayout";
import EditUserProfilePage from "./pages/UserProfileConfigPage";
import TrainingsPage from "./pages/TrainingsPage";
import NotificationsPage from "./pages/NotificationsPage";
import TrainerProfilePage from "./pages/TrainerProfilePage";
import UserListPage from "./pages/UserListPage";
import AthleteProfilePage from "./pages/AthleteProfilePage";
import MyAthletesPage from "./pages/MyAthletesPage";
import TrainingPageForTrainer from "./pages/TrainingPageForTrainer";
import StravaCallback from "./pages/StravaCallback";

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
        <Route
          path={ATHLETE_TRAINING_ROUTE}
          element={<TrainingPageForTrainer />}
        />
        <Route path={NOTIFICATIONS_ROUTE} element={<NotificationsPage />} />
        <Route path={TRAINER_PROFILE} element={<TrainerProfilePage />} />
        <Route path={ATHLETE_PROFILE} element={<AthleteProfilePage />} />
        <Route path={USERS_LIST} element={<UserListPage />} />
        <Route path={MY_ATHLETES} element={<MyAthletesPage />} />
        <Route path={STRAVA_CALLBACK} element={<StravaCallback />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Route>
    </Routes>
  );
};

export default Router;
