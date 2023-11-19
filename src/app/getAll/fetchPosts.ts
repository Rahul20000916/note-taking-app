
import axios from 'axios';

export const fetchPosts = async () => {
  try {
    const response = await axios.get('/api/posts/all');
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};