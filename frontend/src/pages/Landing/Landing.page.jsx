import { Container } from "@mantine/core";
import styles from "./Landing.module.css"

const Landing = () => {
  return (
    <Container>
      <div className={styles.imgWrapper}>
        <img src="https://my.alfred.edu/zoom/_images/foster-lake.jpg" alt="" className={styles.image}/>
      </div>
      <h1>Welcome to our Photographer's portfolio</h1>
      <p>Discover stunning photography</p>
      <h2>Key Features</h2>
      <p>Discover and Create</p>
      <p>Our platform empowers photographers to showcase their work.</p>
      <h3>Create and Manage</h3>
      <p>Easily upload, edit, and delete your own photography posts.</p>
      <h3>Explore and Discover</h3>
      <p>Browse a curated collection of stunning photos.</p>
      <div className={styles.imgWrapper}>
        <img src="https://www.pixelstalk.net/wp-content/uploads/2016/07/3840x2160-Images-Free-Download.jpg" alt="" className={styles.image}/>
      </div>
    </Container>
  );
};

export default Landing;
