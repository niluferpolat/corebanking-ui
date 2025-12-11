import { Image } from "primereact/image";
import { Menubar } from "primereact/menubar";
import type { MenuItem } from "primereact/menuitem";
import { useNavigate } from "react-router";
import Logo from "@/assets/logo.png";

function Navbar() {
  const navigate = useNavigate();

  const items: MenuItem[] = [
    {
      label: "Account",
      icon: "pi pi-fw pi-user",
      command: () => navigate("/account"),
    },
  ];

  const start = (
    <div className="flex items-center cursor-pointer select-none" onClick={() => navigate("/")}>
      <Image width="30" className="mr-2" src={Logo} alt="Logo" />
      <p className="text-md font-bold">MiniBank</p>
    </div>
  );
  return <Menubar start={start} className="p-4 bg-white/80 border-b shadow-sm" model={items} />;
}

export default Navbar;
