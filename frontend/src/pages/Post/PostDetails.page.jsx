import { Link, useParams, useSearchParams } from "react-router-dom";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { Button, Container, Grid, Stack, Box, TextInput, Group } from "@mantine/core";
import useBoundStore from "../../store/Store";
import styles from "./PostDetails.page.module.css"
import { useLoaderData } from "react-router-dom";
import {useState} from "react"; 
import { useNavigate } from "react-router-dom";

import { useForm } from '@mantine/form';

function PostDetailsPage() {
  const post = useLoaderData();
  const { user } = useBoundStore((state) => state);
  const navigate = useNavigate();

  const handleDelete = async () => {
    const res = await axios.post(`${DOMAIN}/api/process-delete`, post)
    if (res?.data.success) {
      navigate("/posts");
    }
  }

  const handleUpdate = async (values) => {
    form.values.id = post.id;
    form.values.userId = post.userId;
    const res = await axios.post(`${DOMAIN}/api/process-update`, values)
    if (res?.data.success) {
      window.location.reload();
    }
  };

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      image: post.image,
      title: post.title,
      category: post.category,
      content: post.content,
    },
  });

  const [isEdit, setIsEdit] = useState(false);

  return (
    <>
      {isEdit ? 
      <Box maw={300} mx="auto">
      <form onSubmit={form.onSubmit(handleUpdate)}>
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
      </form>
      </Box>
      :
      <Container>
        <Grid>
          <Grid.Col span={user.id === post.userId ? 4 : 6}>
            <Stack>
              <Box>Author: {post.userId}</Box>
              <Box>Title: {post.title}</Box>
              <Box>Category: {post.category}</Box>
              <Box>Content: {post.content}</Box>
          </Stack>
          </Grid.Col>
          <Grid.Col span={user.id === post.userId ? 4 : 6}>
            <Box>
              <img src={post.image} alt={post.title} className={styles.image}/>
            </Box>
          </Grid.Col>
          <Grid.Col span={user.id === post.userId ? 2 : 0}>
            {user.id === post.userId ? 
            <Stack>
              <Button>
                <Link onClick={() => setIsEdit(true)}>Edit</Link>
              </Button>
              <Button>
                <Link onClick={handleDelete}>Delete</Link>
              </Button>
            </Stack> : ""}
          </Grid.Col>
        </Grid>
        <Button>
          <Link to="/posts">Back to Posts</Link>
        </Button>
      </Container>
}
    </>
  );
}

export const postDetailsLoader = async ({ params }) => {
  const res = await axios.get(`${DOMAIN}/api/posts/${params.id}`)
  console.log(res.data);
  return res.data;
};

export default PostDetailsPage;
