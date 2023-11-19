'use client'
import PostCard from '@/components/PostCard'
import axios from 'axios';
import { useState, useEffect } from 'react';

interface Post {
  id: string;
  title: string;
  tag: {
    id: string;
    name: string;
  };
  content: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get('/api/posts/all');
        console.log(response.data, 'data fetching');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }
    fetchPosts();
  }, []);

  return (
    <main className='grid items-center justify-center md:grid-cols-2 lg:grid-cols-3 gap-2 mt-10'>
      {posts &&
        posts.map((post: Post) => (
           <PostCard key={post.id} post={post} /> 
        ))}
    </main>
  );
}
