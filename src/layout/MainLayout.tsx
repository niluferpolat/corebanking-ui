import Navbar from "@/components/Navbar";
import { Outlet } from "react-router";

function MainLayout() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
