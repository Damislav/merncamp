import axios from "axios";
import { useContext } from "react";
import ParallaxBG from "../components/cards/ParallaxBG";
import { UserContext } from "../context";
import Post from "../components/cards/Post";
import Head from "next/head";
function Home({ posts }) {
  const [state, setState] = useContext(UserContext);
  const head = () => (
    <Head>
      <title>MERNCAMP - A social network by devs for devs</title>
      <meta name="description" description="A social network for developers" />
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
          {posts.map((post) => (
            <div className="col-md-4">
              <Link key={post._id} href={`/post/${post._id}`}>
                <a>
                  <Post post={post} />
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;

export async function getServerSideProps() {
  const { data } = await axios.get("/posts");

  return {
    props: {
      posts: data,
    },
  };
}
