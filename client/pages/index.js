import { useContext, useEffect } from "react";
import { UserContext } from "../context";
import ParallaxBG from "../components/cards/ParallaxBG";
import axios from "axios";
import PostPublic from "../components/cards/PostPublic";
import Head from "next/head";
import Link from "next/link";
import io from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SOCKETIO, {
  reconnection: true,
});
const Home = ({ posts }) => {
  const [state, setState] = useContext(UserContext);
  useEffect(() => {
 
  }, []);
  const head = () => (
    <Head>
      <title>MERNCAMP - A social network by devs for devs</title>
      <meta
        name="description"
        content="A social network by developers for other web developers"
      />
      <meta
        property="og:description"
        content="A social network by developers for other web developers"
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="MERNCAMP" />
      <meta property="og:url" content="http://merncamp.com" />
      <meta
        property="og:image:secure_url"
        content="http://merncamp.com/images/default.jpg"
      />
    </Head>
  );

  return (
    <>
      {head()}
      <ParallaxBG url="/images/default.jpg" />

      <div className="container">
        <div className="row pt-5">
          {posts &&
            posts.map((post, i) => (
              <div key={i} className="col-md-4">
                <Link href={`/post/view/${post._id}`}>
                  <a>
                    <PostPublic key={post._id} post={post} />
                  </a>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Home;

export async function getServerSideProps(context) {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/posts`);

  return {
    props: {
      posts: data,
    },
  };
}
