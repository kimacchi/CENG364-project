import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import React from "react";
import { AppContext } from "./_app";
import { useContext } from "react";
import { useRouter } from "next/router";

const login = () => {

    const router = useRouter()
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const { user, setUser } = useContext(AppContext);

  const onLogin = async () => {
    const res = await axios.post("/api/login", {
      username,
      password,
    });
    console.log(res.data);
    setUser(res.data);
    router.push('/')
  };
  const onSignUp = async () => {
    const res = await axios.post("/api/register", {
      username,
      password,
    });
    console.log(res.data);
    setUser(res.data);
    router.push('/')

  };

  return (
    <div className="bg-zinc-800 w-full min-h-screen text-white pb-8 flex flex-col items-center dark font-mono py-16 justify-center gap-4">
      <h1 className="text-2xl">Login to your account</h1>
      <h2 className="text-sm w-1/5 text-center text-gray-400">
        Sign up by filling the form and clicking sign up button.
      </h2>
      <Input
        type="text"
        label="Username"
        labelPlacement="outside"
        variant="bordered"
        className="w-1/4"
        onValueChange={setUsername}
      />
      <Input
        type="password"
        label="Password"
        labelPlacement="outside"
        variant="bordered"
        className="w-1/4"
        onValueChange={setPassword}
      />
      <Button className="w-1/4 text-xl my-4" onClick={onLogin}>
        Login
      </Button>
      <div className="w-1/5 h-[1px] bg-white"></div>
      <Button className="w-1/4 text-xl mt-4" onClick={onSignUp}>
        Sign up
      </Button>
    </div>
  );
};

export default login;
