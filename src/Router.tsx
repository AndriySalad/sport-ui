import { Navigate, Route, Routes } from "react-router-dom";
import { HOME_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE } from "./Routes";
import Login from "./pages/Login";
import RequireAuth from "./hoc/RequireAuth";
import UserProfilePage from "./pages/UserProfilePage";
import Registration from "./pages/RegistrationPage";
import DefaultLayout from "./layout/defaulLayout";

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
        <Route path="*" element={<h1>Not Found</h1>} />
      </Route>
    </Routes>
  );
};

export default Router;
