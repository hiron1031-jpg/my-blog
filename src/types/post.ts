export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  /** 最終更新日（任意）。速報系の記事など、鮮度が信頼に直結する記事で使う */
  updated?: string;
  category: string;
  tags: string[];
  thumbnail?: string;
  featured?: boolean;
  author: string;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  readingTime: string;
  excerpt: string;
}

export interface PostWithContent extends Post {
  content: string;
}

export interface Heading {
  id: string;
  text: string;
  level: number;
}

export interface Author {
  name: string;
  bio: string;
  avatar?: string;
}
