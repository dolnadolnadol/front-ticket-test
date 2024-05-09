import { FC } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { AboutPage } from "./pages/About";
import { Homepage } from "./pages/Home";
import Throny from "./pages/Throny";
import Tickets from "./pages/Tickets";

const App: FC = () => {
  return (
    <>
      <div className="relative bg-red-800 h-screen w-screen">
        <div className="absolute -translate-x-1/2 -translate-y-1/2 left-[50%] top-[50%]">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/thorn" element={<Throny />} />
            <Route path="/tickets" element={<Tickets />} />
          </Routes>
          {/* <p className="drop-shadow-lg shadow-blue-700 text-6xl motion-safe:animate-bounce">
            hello
          </p> */}
        </div>
        <div className="bg-blue-500 h-screen w-[10rem]">
          <div className="ml-5 text-2xl">
            <ul>
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/about"}>About</Link>
              </li>
              <li>
                <Link to={"/thorn"}>Thron</Link>
              </li>
              <li>
                <Link to={"/tickets"}>Tickets</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
