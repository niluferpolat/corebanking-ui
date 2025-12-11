import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route path="/account" element={<div>AckjhkjhkjcountPage</div>} />
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
