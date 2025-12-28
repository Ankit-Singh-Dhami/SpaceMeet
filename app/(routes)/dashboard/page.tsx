"use client";

import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { api } from "@/convex/_generated/api";
import { useConvex, useMutation } from "convex/react";
import { useEffect } from "react";
import Header from "./_components/Header";
import FileList from "./_components/FileList";

export default function Dashboard() {
  const convex = useConvex();
  const { user }: any = useKindeBrowserClient();
  const createUser = useMutation(api.user.createUser);

  const checkUser = async () => {
    const result = await convex.query(api.user.getUser, { email: user?.email });
    console.log("User query result:", result);

    if (!result?.length) {
      createUser({
        name: user.given_name,
        email: user.email,
        image: user.picture,
      }).then((res) => {
        console.log("User created:", res);
      });
    }
  };

  useEffect(() => {
    if (user) checkUser();
  }, [user]);

  return (
    <div>
      <Header />
      <FileList />
    </div>
  );
}
