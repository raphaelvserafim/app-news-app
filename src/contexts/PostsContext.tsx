import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Post, PostsContextType } from '@/model';

const PostsContext = createContext<PostsContextType | undefined>(undefined);

interface PostsProviderProps {
  children: ReactNode;
}

const PostsProvider: React.FC<PostsProviderProps> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const addPosts = (newPosts: Post[]) => {
    setPosts(newPosts);
  };
  return (
    <PostsContext.Provider value={{ posts, addPosts }}>
      {children}
    </PostsContext.Provider>
  );
};

const usePosts = (): PostsContextType | any => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
};

export { PostsProvider, usePosts };
