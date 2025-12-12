import { Outlet } from "react-router";
import { Image } from "primereact/image";
import AuthLogo from "@/assets/authpage.svg";

function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-5xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <Image src={AuthLogo} alt="Auth Illustration" className="w-130" />
        <div className="p-10 h-130 flex flex-col justify-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
