import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import MainLayout from "./layout/MainLayout";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/account" element={<div>AckjhkjhkjcountPage</div>} />
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
