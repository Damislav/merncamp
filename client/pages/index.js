import Image from "next/image";
import profilePic from "./public/images/basketball.webp";
import { useContext } from "react";
import { UserContext } from "../context";

function Home() {
  const [state, setState] = useContext(UserContext);
  return (
    <div className="row">
      <div className="col">
        <h1>Home page</h1>

        <Image width={500} height={500} src={profilePic} />
      </div>
    </div>
  );
}

export default Home;
