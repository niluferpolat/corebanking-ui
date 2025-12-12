import { Image } from "primereact/image";
import { Menubar } from "primereact/menubar";
import type { MenuItem } from "primereact/menuitem";
import { useNavigate } from "react-router";
import Logo from "@/assets/logo.png";
import { Button } from "primereact/button";
import { useAuthStore } from "@/store/auth.store";

function Navbar() {
  const navigate = useNavigate();
  const authStore = useAuthStore();
  const items: MenuItem[] = [
    {
      label: "Account",
      icon: "pi pi-wallet",
      command: () => navigate("/account"),
    },
  ];

  const logout = () => {
    authStore.logout();
  };
  const navigation = () => {
    if (authStore.isAuthenticated) {
      navigate("/account");
    } else {
      navigate("/");
    }
  };
  const start = (
    <div className="flex mr-5 items-center cursor-pointer select-none" onClick={() => navigation()}>
      <Image width="30" className="mr-2" src={Logo} alt="Logo" />
      <p className="text-md font-bold">MiniBank</p>
    </div>
  );

  const end = (
    <div>
      {authStore.isAuthenticated && (
        <Button onClick={() => logout()} icon="pi pi-sign-out" text label="Logout" />
      )}
    </div>
  );
  return (
    <Menubar
      start={start}
      end={end}
      className="p-4 bg-white/80 border-b shadow-sm"
      model={authStore.isAuthenticated ? items : []}
    />
  );
}

export default Navbar;
