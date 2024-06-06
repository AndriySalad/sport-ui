import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import { AuthProvider } from "./utils/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <DefaultLayout />
              </RequireAuth>
            }
          >
            <Route index element={<UserProfilePage />} />
            <Route path="/profile-config" element={<EditUserProfilePage />} />
            <Route path="/trainings" element={<TrainingsPage />} />
            <Route
              path="/trainings/:athleteId"
              element={<TrainingPageForTrainer />}
            />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/trainer/:id" element={<TrainerProfilePage />} />
            <Route path="/athlete/:id" element={<AthleteProfilePage />} />
            <Route path="/users" element={<UserListPage />} />
            <Route path="/my-athletes" element={<MyAthletesPage />} />
            <Route path="/strava-callback" element={<StravaCallback />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
