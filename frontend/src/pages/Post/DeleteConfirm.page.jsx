import {  Button, Group, Box, Loader,  Select } from "@mantine/core";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { useForm } from "@mantine/form";
import { useNavigate, useLoaderData, useParams } from "react-router-dom";
import useBoundStore from "../../store/Store";
import spinnerStyle from "./spinner.module.css";
import { useState } from "react";

function EditPostPage() {
  const params = useParams();
  const { post } = useLoaderData();
  const { user } = useBoundStore((state) => state);
  const navigate = useNavigate();
  const [isSpinner, setIsSpinner] = useState(false);
  const data = [
    { value: "true", label:"Yes, delete this post." },
    { value: "false", label: "No, send me back to the post" },
  ]
  const form = useForm({
    initialValues: {
      isDelete: "false",
    },
  });

  const handleSubmit = async (values) => {
    if(form.values.isDelete === "true") {
      const res = await axios.post(`${DOMAIN}/api/posts/${params.id}/delete`, post);
      if (res?.data.success) {
        setIsSpinner(true);
        navigate(`/posts`);
      }
    } else {
      navigate(`/posts/${params.id}`);
    }
    
    
  };

  return (
    <Box maw={300} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)} className={spinnerStyle.spinnerBase}>
        <Select label={`You are trying to delete the post: ${post.title}. This action cannot be undone, are you sure you want to delete this post?`}
        data={data} {...form.getInputProps("isDelete")} />
        
        <Group position="right" mt="md">
          <Button type="submit">Confirm my selection</Button>
        </Group>
        {isSpinner ? <Loader className={spinnerStyle.spinner}/> : ""}
      </form>
    </Box>
  );
}

export const deleteConfirmLoader = async ({ params }) => {
    const res = await axios.get(`${DOMAIN}/api/posts/${params.id}`)
    return res.data;
}

export default EditPostPage;
