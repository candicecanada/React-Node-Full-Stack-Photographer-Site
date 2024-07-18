import { TextInput, Button, Group, Box, Loader, Code } from "@mantine/core";
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
  const form = useForm({
    initialValues: {
      title: post.title,
      category: post.category,
      image: post.image,
      content: post.content,
    },
  });

  const handleSubmit = async (values) => {
    form.values.id = params.id;
    form.values.userId = user.id;
    console.log(values);
    const res = await axios.post(`${DOMAIN}/api/posts/${params.id}/update`, values);
    if (res?.data.success) {
      setIsSpinner(true);
      navigate(`/posts/${params.id}`);
    }
  };

  return (
    <Box maw={300} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)} className={spinnerStyle.spinnerBase}>
        <TextInput
          label="Title"
          placeholder="Enter a Title"
          {...form.getInputProps("title")}
        />

        <TextInput
          label="Category"
          placeholder="Enter a Category"
          {...form.getInputProps("category")}
        />
        <TextInput
          label="Image"
          placeholder="Enter an Image"
          {...form.getInputProps("image")}
        />

        <TextInput
          label="Content"
          placeholder="Enter some content"
          {...form.getInputProps("content")}
        />

        <Group position="right" mt="md">
          <Button type="submit">Update</Button>
        </Group>
        {isSpinner ? <Loader className={spinnerStyle.spinner}/> : ""}

      </form>
    </Box>
  );
}

export const editPostLoader = async ({ params }) => {
    const res = await axios.get(`${DOMAIN}/api/posts/${params.id}`)
    return res.data;
}

export default EditPostPage;
