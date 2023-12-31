"use client";
import { FormInputPost } from "@/types";
import FormPost from "@/components/FormPost";
import { SubmitHandler } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FC } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import BackButton from "@/components/BackButton";

interface EditNotePageProps {
  params: {
    id: string;
  };
}

const EditNotePage: FC<EditNotePageProps> = ({ params }) => {
  const { id } = params;
  const router = useRouter();
  const { data: dataPost, isLoading: isLoadingPost } = useQuery({
    queryKey: ["posts", id],
    queryFn: async () => {
      const response = await axios.get(`/api/posts/${id}`);
      return response.data;
    },
  });

  const { mutate: updatPost, isPending: isPendingSubmit } = useMutation({
    mutationFn: (newPost: FormInputPost) => {
      return axios.patch(`/api/posts/${id}`, newPost);
    },
    onError: (error) => {
      console.error(error);
    },
    onSuccess: () => {
      router.push("/");
      router.refresh();
    },
  });

  const handleEditPost: SubmitHandler<FormInputPost> = (data) => {
    updatPost(data);
  };

  if (isLoadingPost) {
    return (
      <div className="text-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
    );
  }
  return (
    <div>
      <BackButton />
      <h1 className="text-2xl my-4 font-bold text-center">EDIT NOTE</h1>
      <FormPost
        isPendingSubmit={isPendingSubmit}
        submit={handleEditPost}
        initialValue={dataPost}
        isEditing={true}
      />
    </div>
  );
};

export default EditNotePage;
