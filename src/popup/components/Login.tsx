import React from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {
  Card,
  Heading,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Box,
} from "@chakra-ui/react";
import { setLoggedInUserInStorage } from "../storage";
import { Modal } from "./Modal";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((data) => {
        setLoggedInUserInStorage(data.user);
      })
      .catch((error) => {
        console.log("error", error);
        setError(error.message);
      });
  };

  return (
    <Modal>
      <Card padding={10}>
        <Heading size="md">Login</Heading>
        <form onSubmit={handleLogin}>
          <Stack spacing={3}>
            <FormControl isInvalid={error.length > 0 || false}>
              <FormErrorMessage>{error}</FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel>Email </FormLabel>
              <Input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password </FormLabel>
              <Input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </FormControl>
            <Button type="submit" colorScheme="teal">
              Submit
            </Button>
          </Stack>
        </form>
      </Card>
    </Modal>
  );
};

export default Login;
