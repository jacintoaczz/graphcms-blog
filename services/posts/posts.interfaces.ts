export interface IPosts {
  postsConnection: PostsConnection;
}

export interface PostsConnection {
  edges: Edge[];
}

export interface Edge {
  node: Node;
}

export interface Node {
  author: Author;
  title: string;
  slug: string;
  createdAt: string;
  excerpt: string;
  featuredImage: FeaturedImage;
  categories: Category[];
}

export interface Author {
  bio: string;
  name: string;
  id: string;
  photo: FeaturedImage;
}

export interface FeaturedImage {
  url: string;
}

export interface Category {
  name: string;
  id: string;
  slug: string;
}

export interface IPostDetails {
  posts: IPostDetail[];
}
export interface IPostDetail {
  title: string;
  slug: string;
  createdAt: string;
  featuredImage: FeaturedImage;
}
