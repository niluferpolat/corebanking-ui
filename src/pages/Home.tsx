import "@/styles/Home.css";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import MainImage from "@/assets/main-page.svg";
function Home() {
  return (
    <>
      <div className="flex items-center justify-between mt-20 h-120 p-10 rounded-md shadow-lg bg-white">
        <Image width="500" src={MainImage} alt="MiniBank Logo" />
        <div className="max-w-lg text-right">
          <h1 className="text-5xl font-bold text-gray-800">Welcome to Minibank</h1>
          <p className="text-gray-600 mt-4">Your trusted partner in managing your finances.</p>
          <div className="mt-6 flex justify-end">
            <Button label="Open an Account" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
