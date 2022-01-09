import Link from "next/link";
import { DateTime } from "luxon";

import { Node } from "@/services/posts.interfaces";

interface IPostCard {
  post: Node;
}

const PostCard = ({ post }: IPostCard) => {
  return (
    <article className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
      <div className="relative overflow-hidden shadow-md mb-6">
        <img
          src={post.featuredImage.url}
          alt={`${post.title} post's image`}
          className="object-top h-full w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg"
        />
      </div>

      <h1 className="transition duration-700 hover:text-pink-600 text-center mb-8 cursor-pointer text-3xl font-semibold">
        <Link href={`/post/${post.slug}`}>{post.title}</Link>
      </h1>

      {/* Post's details */}
      <div className="block lg:flex text-center items-center justify-center mb-8 w-full">
        <section className="flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
          <img
            src={post.author.photo.url}
            alt={`${post.author.name}'s photo`}
            width="30px"
            height="30px"
            className="align-middle rounded-full"
          />
          <h2 className="inline align-middle text-gray-700 ml-2 font-medium text-lg">
            {post.author.name}
          </h2>
        </section>

        <div className="font-medium text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 inline mr-2 text-pink-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="align-middle">
            {DateTime.fromISO(post.createdAt).toFormat("dd LLLL, yyyy")}
          </span>
        </div>
      </div>
      {/* #Post's details */}

      {/* Post's excerpt */}
      <p className="text-center text-lg text-gray-700 font-normal px-4 lg:px-20 mb-8">
        {post.excerpt}
      </p>
      {/* #Post's excerpt */}

      <div className="text-center">
        <Link href={`/post/${post.slug}`}>
          <a className="transition duration-500 transform hover:-translate-y-1 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">
            Continue reading...
          </a>
        </Link>
      </div>
    </article>
  );
};

export default PostCard;
