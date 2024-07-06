import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useBoundStore from "../../store/Store";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Code,
  Title,
  Text,
  Container,
  Group,
  Button,
  Loader,
  Center
} from '@mantine/core';
import classes from './AuthenticationTitle.module.css';
import { useForm, hasLength, isEmail } from '@mantine/form';

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginService, authLoading, user } = useBoundStore((state) => state);


  useEffect(() => {
    if (!!user) {
      navigate("/posts");
    }
  }, [user]);

  const onLogin = async () => {
    let email = form.values.email;
    let password = form.values.password;
    if (!email || !password) return;
    loginService(email, password);
  };

  const form = useForm({
    mode: 'uncontrolled', // doesn't seem to make any difference
    initialValues: { email: '', password: '' },
    validate: {
      email: isEmail('Invalid email'),
      password: hasLength({ min: 3 }, 'Must be at least 3 characters'),
    },
  });

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
          Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor size="sm" component="button">
          Create account
        </Anchor>
      </Text>
      <form onSubmit={form.onSubmit(onLogin)}>
        <TextInput {...form.getInputProps('email')} label="Email" placeholder="email" name="email" type="email" required />
        <PasswordInput {...form.getInputProps('password')} label="Password" placeholder="password" name="password" type="password" required mt="md" />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button type="submit" fullWidth mt="xl">
          Login
        </Button>
        <Center>
          {authLoading ? <Loader color="blue"/> : null}
        </Center>
      </form>
      
      

    </Container>
  );
};

export default LoginPage;
