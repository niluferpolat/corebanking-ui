import { Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage/LoginPage";
import MainLayout from "./layouts/MainLayout";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<MainLayout />}>
        <Route path="/account" element={<div>AccountPage</div>} />
      </Route>
    </Routes>
  );
}

export default App;
