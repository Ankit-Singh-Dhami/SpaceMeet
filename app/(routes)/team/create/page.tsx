"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Create = () => {
  const [teamName, setTeamName] = useState("");
  const { user }: any = useKindeBrowserClient();
  const createTeam = useMutation(api.team.createTeam);
  const router = useRouter();

  const createNewTeam = () => {
    createTeam({ teamName, createBy: user.email }).then((response) => {
      console.log("Team created:", response);
      if (response) {
        router.push("/dashboard");
        toast.success("Team created successfully!");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex flex-col">
      {/* Logo at top-left */}
      <div className="flex items-center space-x-2 mb-6">
        <img
          src="/logo.png" // replace with your logo path
          alt="Logo"
          className="w-12 h-12"
        />
        <span className="text-2xl font-bold">SpaceMeet</span>
      </div>

      {/* Main content centered */}
      <div className="flex flex-col items-center justify-start flex-1 mt-16">
        {/* Heading */}
        <h1 className="text-3xl font-bold mb-2">Create Your Team</h1>

        {/* Subheading */}
        <p className="text-gray-600 mb-6 text-center">
          Enter a unique name for your team and get started!
        </p>

        {/* Input */}
        <div className="w-full max-w-sm">
          <label
            htmlFor="teamName"
            className="block text-gray-700 font-medium mb-2"
          >
            Team Name
          </label>
          <Input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            onChange={(e) => setTeamName(e.target.value)}
          />

          {/* Create Team Button */}
          <div className="flex justify-center">
            <button
              disabled={!(teamName && teamName?.length > 0)}
              className="w-60 bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              onClick={createNewTeam}
            >
              Create Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
