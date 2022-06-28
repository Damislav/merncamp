import Image from "next/image";
import profilePic from "/public/images/basketball.webp";
import { useContext } from "react";
import { UserContext } from "../context";

function Home() {
  const [state, setState] = useContext(UserContext);
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="display-1 text-center">Home page</h1>

          <Image width={500} height={500} src={profilePic} />
        </div>
      </div>
    </div>
  );
}

export default Home;
