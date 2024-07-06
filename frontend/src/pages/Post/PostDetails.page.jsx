import { Link, useParams, useSearchParams } from "react-router-dom";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { Button, Container, Grid, Stack, Box } from "@mantine/core";
import { findPostById, deletePostById } from "../../../../backend/fakedb";
import useBoundStore from "../../store/Store";
import styles from "./PostDetails.page.module.css"
import { useLoaderData } from "react-router-dom";

function PostDetailsPage() {
  const post = useLoaderData();
  const { user } = useBoundStore((state) => state);
  console.log("passing the post to POST: ", post);
  const handleDelete = async () => {
    const res = await axios.post(`${DOMAIN}/api/delete`, post)
    if (res?.data.success) {
      navigate("/posts");
    }
  }

  return (
    <>
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
          <Grid.Col span={user.id === post.userId ? 4 : 0}>
            {user.id === post.userId ? 
            <Stack>
              <Button>Edit</Button>
              <Button>
                <Link to="/posts" onClick={handleDelete}>Delete</Link>
              </Button>
            </Stack> : ""}
          </Grid.Col>
        </Grid>
        <Button>
          <Link to="/posts">Back to Posts</Link>
        </Button>
      </Container>
    </>
  );
}

export const postDetailsLoader = async ({ params }) => {
  const res = await axios.get(`${DOMAIN}/api/posts/${params.id}`)
  console.log(res.data);
  return res.data;
};

export default PostDetailsPage;
