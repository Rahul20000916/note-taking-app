'use client'
import PostCard from '@/components/PostCard'
import axios from 'axios';
import { PenSquare } from 'lucide-react';
import { useState, useEffect } from 'react';
import { fetchPosts } from './getAll/fetchPosts';

interface Post {
  id: string;
  title: string;
  tag: {
    id: string;
    name: string;
  };
  content: string;
}

export default function Home({ posts }: { posts: Post[] }) {
  // const [posts, setPosts] = useState<Post[] | null>(null);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const data = await fetchPosts(); 
  //       console.log(data, 'data fetching');
  //       setPosts(data);
  //     } catch (error) {
  //       console.error('Error fetching posts:', error);
  //     }
  //   }
  //   fetchData();
  // }, []);

  return (
    <main className='grid items-center justify-center md:grid-cols-2 lg:grid-cols-3 gap-2 mt-10'>
      {posts &&
        posts.map((post: Post) => (
           <PostCard key={post.id} post={post} /> 
        ))}
    </main>
  );
}

export const getServerSideProps = async () => {
  try {
    const data = await fetchPosts();
    console.log(data, 'data fetching');
    return {
      props: { posts: data },
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      props: { posts: [] }, // Return an empty array or handle the error as needed
    };
  }
};