"use client";
import { Button } from "@/components/ui/button";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";

const Dashboard = () => {
  return (
    <>
      <h1>Dashboard</h1>

      <LogoutLink>Logout</LogoutLink>
    </>
  );
};

export default Dashboard;
