import { Route, Routes } from "react-router"
import LoginPage from "./pages/LoginPage/LoginPage"
import MainLayout from "./layouts/MainLayout"

function App() {

  return (
 <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route element={<MainLayout />}>
      <Route path="/account" element={<div>AccountPage</div>} />
    </Route>
 </Routes>
  )
}

export default App
