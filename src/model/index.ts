import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  NewsDetail: { id: number };
};


export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;


export interface NewsCardProps {
  title: string;
  description: string;
  imageUrl: string;
  onPress: () => void;
}

export interface ListRenderItemInfo {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}


export type Post = {
  id: number;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  link: string;
  author: number;
  _embedded?: {
    'wp:featuredmedia'?: [
      {
        media_details?: {
          sizes?: {
            thumbnail?: { source_url: string };
            full?: { source_url: string };
          };
        };
        source_url: string;
      }
    ];
  };
};

export type FormattedPost = {
  id: number;
  title: string;
  date: string;
  description: string;
  link: string;
  thumbnailUrl: string;
  fullImageUrl: string;
  content: string;
};


export interface NewsCardAProps {
  item: FormattedPost;
  onPress: (item: FormattedPost) => void;
}


export interface PostsContextType {
  posts: Post[];
  addPosts: (newPosts: Post[]) => void;
}