import { Paper, Text, Title, Button, rem } from "@mantine/core";
import { Link } from "react-router-dom";
import classes from "./ArticleCardImage.module.css";

export function ArticleCardImage({ title, category, image, id }) {
  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      style={{ backgroundImage: `url(${image})` }}
      className={classes.card}
    >
      <div>
        <Text className={classes.category} size="xs">
          {category}
        </Text>
        <Title order={3} className={classes.title}>
          {title}
        </Title>
      </div>
      <Button variant="white" color="dark">
        <Link to={id.toString()}>View</Link>
      </Button>
    </Paper>
  );
}
