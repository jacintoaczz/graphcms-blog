import Link from "next/link";
import { useEffect, useState } from "react";

import { IPostDetail } from "@/services/posts.interfaces";
import { getRecentPosts, getSimilarPosts } from "@/services/posts.service";
import { DateTime } from "luxon";

interface IPostWidget {
  slug?: string;
  categories?: string[];
}

const PostWidget = ({ categories, slug }: IPostWidget) => {
  /* Hooks */
  const [relatedPosts, setRelatedPosts] = useState<IPostDetail[]>([]);

  useEffect(() => {
    let isMounted = true;
    if (slug) {
      getSimilarPosts(slug, categories).then((posts) => {
        if (isMounted) {
          setRelatedPosts(posts);
        }
      });
    } else {
      getRecentPosts().then((posts) => {
        if (isMounted) {
          setRelatedPosts(posts);
        }
      });
    }

    return () => {
      isMounted = false;
    };
  }, [slug]);

  return (
    <div className="bg-white shadow-dash-lg rounded-lg p-8 mb-8 ">
      <h3 className="text-lg mb-8 font-semibold border-b pb-4">
        {slug ? "Related Posts" : "Recent Posts"}
      </h3>

      {relatedPosts &&
        relatedPosts.map((post) => (
          <article key={post.title} className="flex items-center w-full">
            <div className="w-16 flex-none">
              <img
                src={post.featuredImage.url}
                alt={`${post.title} post's image`}
                height="60px"
                width="60px"
                className="align-middle rounded-full"
              />
            </div>

            <div className="flex-grow ml-4">
              <h4 className="font-xs text-gray-500">
                {DateTime.fromISO(post.createdAt).toFormat("dd LLLL, yyyy")}
              </h4>

              <Link href={`/post/${post.slug}`} key={post.title}>
                <a className="text-md ">{post.title}</a>
              </Link>
            </div>
          </article>
        ))}
    </div>
  );
};

export default PostWidget;
