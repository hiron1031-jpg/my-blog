export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
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
