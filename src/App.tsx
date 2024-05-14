import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import { AboutPage } from "./pages/AboutPage";
import { Homepage } from "./pages/Home";
import Throny from "./pages/Throny";
import Tickets from "./pages/Tickets";

const App: FC = () => {
  return (
    <>
      <Layout>
        {/* <div className="relative flex bg-red-800 h-[100%] w-screen"> */}
        {/* <div className="bg-blue-500 h-screen w-[10rem] sticky top-0">
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
        </div> */}
        {/* <div className=" ml-[3rem] mr-[2rem] lg:ml-[5rem] lg:mr-[3rem] mt-[2rem]"> */}
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/thorn" element={<Throny />} />
          <Route path="/tickets/*" element={<Tickets />}>
          </Route>
        </Routes>
        {/* </div> */}
        {/* </div> */}
      </Layout>
    </>
  );
};

export default App;
