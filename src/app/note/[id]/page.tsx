"use client";
import BackButton from "@/components/BackButton";
import ButtonAction from "@/components/ButtonAction";
import { FC, useState, useEffect } from "react";
import axios from "axios";

interface NoteDetailPageProps {
  params: {
    id: string;
  };
}

interface Post {
  id: string;
  title: string;
  tag: {
    id: string;
    name: string;
  };
  content: string;
}

const NoteDetailPage: FC<NoteDetailPageProps> = ({ params }) => {
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const getPost = async (id: string) => {
      try {
        const response = await axios.get(`/api/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error(error);
        setPost(null);
      }
    };
    getPost(params.id);
  }, [params.id]);
  return (
    <div>
      <BackButton />
      <div className="mb-8">
        <div className="mt-2">
          <span className="badge badge-ghost">
            {post ? post.tag.name : "Loading..."}
          </span>
        </div>
        {post ? (
          <div>
            <h2 className="text-exl font-bold my-4">{post.title}</h2>
          </div>
        ) : (
          <h2 className="text-exl font-bold my-4">Loading...</h2>
        )}
        <ButtonAction id={params.id} />
      </div>
      <p className="text-gray-400">{post ? post.content : "Loading"}</p>
    </div>
  );
};

export default NoteDetailPage;
