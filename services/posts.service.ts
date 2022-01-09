import { request, gql, GraphQLClient } from "graphql-request";
import { IPostDetails, IPosts } from "./posts.interfaces";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
// const graphQLClient = new GraphQLClient(graphqlAPI!, {
//   headers: {},
// });

export const getPosts = async () => {
  const query = gql`
    query PostsQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            title
            slug
            createdAt
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              id
              slug
            }
          }
        }
      }
    }
  `;

  // const result = await graphQLClient.request<IPosts>(query);

  const result: IPosts = await request(graphqlAPI!, query);

  return result.postsConnection.edges;
};

export const getRecentPosts = async () => {
  const query = gql`
    query GetPostsDetails {
      posts(orderBy: createdAt_ASC, last: 3) {
        title
        slug
        createdAt
        featuredImage {
          url
        }
      }
    }
  `;

  const result: IPostDetails = await request(graphqlAPI!, query);

  return result.posts;
};

export const getSimilarPosts = async (slug?: string, categories?: string[]) => {
  const query = gql`
    query GetPostsDetails($slug: String!, $categories: [String]!) {
      posts(where: {slug_not: $$slug}, AND: { categories_some: {slug_in: $categories}}, last: 3) {
        title
        slug
        createdAt
        featuredImage {
          url
        }
      }
    }
  `;

  const result: IPostDetails = await request(graphqlAPI!, query);

  return result.posts;
};
