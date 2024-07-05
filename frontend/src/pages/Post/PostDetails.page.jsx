import { Link, useParams, useSearchParams } from "react-router-dom";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { Button, Container, Grid, Stack, Box } from "@mantine/core";
import { findPostById, deletePostById } from "../../../../backend/fakedb";
import useBoundStore from "../../store/Store";
import styles from "./PostDetails.page.module.css"

function PostDetailsPage() {
  const postId = useParams().id;
  const post = findPostById(postId);
  const { user } = useBoundStore((state) => state);
  const handleDelete = () => {
    deletePostById(postId);
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
  // do something with this
  return null;
};

export default PostDetailsPage;
