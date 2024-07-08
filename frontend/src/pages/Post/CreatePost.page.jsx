import { TextInput, Button, Group, Box, Loader } from "@mantine/core";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import useBoundStore from "../../store/Store";
import { v4 as uuidv4 } from 'uuid';
import spinnerStyle from "./spinner.module.css";
import { useState } from "react";

function CreatePostPage() {
  const { user } = useBoundStore((state) => state);
  const navigate = useNavigate();
  const [isSpinner, setIsSpinner] = useState(false);
  const form = useForm({
    initialValues: {
      title: "",
      category: "",
      image: "",
      content: "",
    },
  });

  const handleSubmit = async (values) => {
    form.values.id = uuidv4();
    form.values.userId = user.id;
    const res = await axios.post(`${DOMAIN}/api/process-create`, values);
    if (res?.data.success) {
      setIsSpinner(true);
      navigate("/posts");
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
          <Button type="submit">Submit</Button>
        </Group>
        {isSpinner ? <Loader className={spinnerStyle.spinner}/> : ""}
      </form>
    </Box>
  );
}

export default CreatePostPage;
