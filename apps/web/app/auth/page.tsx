import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import {
  AuthForm,
  AuthFormFieldCheckBox,
  AuthFormFieldInput,
  AuthFormSubmit,
} from "@workspace/ui/components/form-field/auth/form-field";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import { cn } from "@workspace/ui/lib/utils";
import Link from "next/link";
import React from "react";
import { loginAction, signupAction, ValidatePasswordRestriction } from "../../actions/auth/action";

export default function AuthPage() {
  return (
    <div className={cn("w-full flex flex-1 justify-center items-center")}>
      <Card className="border-2 w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">
            Welcome to SportBook
          </CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* Login Form */}
            <TabsContent value="login">
              <AuthForm onformSubmit={loginAction}>
                <AuthFormFieldInput
                  propertyName={"Email"}
                  caption="Email"
                  type="email"
                  isRequiredField
                />
                <AuthFormFieldInput
                  propertyName={"Password"}
                  caption="Password"
                  type="password"
                  isRequiredField
                />
                <AuthFormFieldCheckBox propertyName={"RememberMe"}>
                  Remember me for 30 days
                </AuthFormFieldCheckBox>
                <AuthFormSubmit
                  className="w-full font-semibold"
                  loadingText="Logging in..."
                >
                  Login
                </AuthFormSubmit>
              </AuthForm>
            </TabsContent>

            {/* Sign Up Form */}
            <TabsContent value="signup">
              <AuthForm onformSubmit={signupAction}>
                <AuthFormFieldInput propertyName={"Name"} caption="Full Name" />
                <AuthFormFieldInput
                  propertyName={"Email"}
                  caption="Email"
                  type="email"
                />
                <AuthFormFieldInput
                  propertyName={"Password"}
                  caption="Password"
                  type="password"
                  hint="Password must be at least 8 characters long"
                  customValidation={ValidatePasswordRestriction}
                />
                <AuthFormFieldInput
                  propertyName={"Confirm Password"}
                  caption="Confirm Password"
                  type="password"
                />
                <AuthFormFieldCheckBox propertyName={"AgreeToTerms"}>
                  <div>
                    I agree to the{" "}
                    <Link href="#" className="text-blue-500 hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="text-blue-500 hover:underline">
                      Privacy Policy
                    </Link>
                  </div>
                </AuthFormFieldCheckBox>
                <AuthFormSubmit
                  className="w-full font-semibold"
                  loadingText="Signing up..."
                >
                  Sign Up
                </AuthFormSubmit>
              </AuthForm>
            </TabsContent>
          </Tabs>

          {/* <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <ButtonWithIconImage
              image={{
                src: "/icons/google.svg",
                alt: "Google",
                height: 20,
                width: 20,
              }}
              buttonText="Google"
            />
            <ButtonWithIconImage
              image={{
                src: "/icons/github.svg",
                alt: "Github",
                height: 20,
                width: 20,
              }}
              buttonText="Github"
            />
          </div> */}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-muted-foreground">
            By continuing, you agree to SportBook's Terms of Service and Privacy
            Policy.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
