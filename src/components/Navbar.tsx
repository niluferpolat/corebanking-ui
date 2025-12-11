import { Menubar } from "primereact/menubar";
import type { MenuItem } from "primereact/menuitem";
import { useNavigate } from "react-router";

function Navbar() {
  const navigate = useNavigate();

  const items: MenuItem[] = [
    {
      label: "Home",
      icon: "pi pi-fw pi-home",
      command: () => navigate("/"),
    },
    {
      label: "Account",
      icon: "pi pi-fw pi-user",
      command: () => navigate("/account"),
    },
  ];

  return <Menubar className="p-4 bg-white/80 border-b shadow-sm" model={items} />;
}

export default Navbar;
