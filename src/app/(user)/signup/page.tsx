"use client";

import { FaGithub, FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { signIn } from "next-auth/react";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Create an account
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Button
            onClick={() => signIn()}
            variant="outline"
            className="w-full hover:bg-lightOrange duration-300 bg-transparent"
          >
            <FaGoogle className="mr-2 h-4 w-4 hover:text-white" />
            Google
          </Button>
          <Button
            variant="outline"
            className="w-full hover:bg-lightOrange duration-300 bg-transparent"
          >
            <FaGithub className="mr-2 h-4 w-4 hover:text-white" />
            Github
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
