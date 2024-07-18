import { Link, useParams, useSearchParams } from "react-router-dom";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { Button, Container, Grid, Stack, Box, TextInput, Group, Loader } from "@mantine/core";
import useBoundStore from "../../store/Store";
import styles from "./PostDetails.page.module.css"
import { useLoaderData } from "react-router-dom";
import {useState} from "react"; 
import { useNavigate } from "react-router-dom";
import { useForm } from '@mantine/form';
import spinnerStyle from "./spinner.module.css";

function PostDetailsPage() {
  const params = useParams();
  const { post, author } = useLoaderData();
  const { user } = useBoundStore((state) => state);
  const navigate = useNavigate();
  const [isSpinner, setIsSpinner] = useState(false);

  
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      image: post.image,
      title: post.title,
      category: post.category,
      content: post.content,
    },
  });

  

  return (
      <Container className={spinnerStyle.spinnerBase}>
        <Grid>
          <Grid.Col span={6}>
            <Stack>
              <Box>Author: {author}</Box>
              <Box>Title: {post.title}</Box>
              <Box>Category: {post.category}</Box>
              <Box>Content: {post.content}</Box>
          </Stack>
          </Grid.Col>
          <Grid.Col span={6}>
            <Box>
              <img src={post.image} alt={post.title} className={styles.image}/>
            </Box>
          </Grid.Col>
        </Grid>
        {user.id === post.userId 
        ? <Grid>
            <Grid.Col span={4}>
              <Stack>
                <Link to={`/posts/${params.id}/edit`} className={styles.link}>Edit</Link>
                <Link to={`/posts/${params.id}/deleteConfirm`} className={styles.link}>Delete</Link>
                <Link to="/posts" className={styles.link} onClick={() => setIsSpinner(true)}>Back to Posts</Link>
              </Stack>
            </Grid.Col>
        </Grid> 
        : <Grid>
            <Grid.Col span={4}>
              <Stack>
                <Link to="/posts" className={styles.link} onClick={() => setIsSpinner(true)}>Back to Posts</Link>
              </Stack>
            </Grid.Col>
        </Grid> 
        }      
        {isSpinner ? <Loader className={spinnerStyle.spinner}/> : ""}
      </Container>
  );
}

export const postDetailsLoader = async ({ params }) => {
  const res = await axios.get(`${DOMAIN}/api/posts/${params.id}`)
  return res.data;
};

export default PostDetailsPage;
