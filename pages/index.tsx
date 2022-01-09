import Head from "next/head";
import { GetStaticProps } from "next";

import { Categories, PostCard, PostWidget } from "@components/index";
import { getPosts, getRecentPosts } from "@/services/posts.service";
import { Edge } from "@/services/posts.interfaces";

interface IHomePage {
  posts: Edge[];
  testPosts: unknown;
}

const Home = ({ posts, testPosts }: IHomePage) => {
  console.log("Posts ", posts);
  console.log("TestPosts ", testPosts);

  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>CMS Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <main className="lg:col-span-8 col-span-1">
          {posts.map((post) => (
            <PostCard post={post.node} key={post.node.slug} />
          ))}
        </main>

        <div className="lg:col-span-4 col-span-1">
          <aside className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Home;

interface Props {
  posts: Edge[];
  testPosts: unknown;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = (await getPosts()) || [];

  const testPosts = (await getRecentPosts()) || [];

  return {
    props: {
      posts,
      testPosts,
    },
  };
};
