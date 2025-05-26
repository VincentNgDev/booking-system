"use server";

import { signIn, signOut } from "@/auth";
import { RouteHelper } from "@/lib/route-helper";
import { AuthState } from "@workspace/ui/components/form-field/auth/form-field";
import { AuthError } from "next-auth";

export async function loginAction(data: {
  Email: string;
  Password: string;
}): Promise<AuthState> {
  // return { success: false, message: "Login Failed" } as AuthState;
  // Handle login logic here
  const email = data.Email;
  const password = data.Password;

  try {
    await signIn("credentials", {
      email: email,
      password: password,
      redirectTo: RouteHelper.getRouteInfo({ route: RouteHelper.home }),
    });

    return { success: true, message: "Login successful" } as AuthState;
  } catch (error) {
    if (error instanceof AuthError) {
      console.error("AuthError:", error);
      const { cause, type } = error;
      switch (type) {
        case "CallbackRouteError":
          break;

        default:
          break;
      }
      return {
        success: false,
        message: `Invalid credentials`,
      } as AuthState;
    }

    throw error;
  }
}

export async function signupAction(data: any): Promise<AuthState> {
  // Handle sign up logic here
  // console.log("Sign up data:", data);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("Sign up data:", data);
  return { success: true, message: "Sign up successful" } as AuthState;
}

export async function ValidatePasswordRestriction(
  password: string
): Promise<boolean | string> {
  // Handle password restriction validation logic here
  console.log("Password restriction validation: ", password);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (password === undefined || password.length < 8) {
    return "Password must be at least 8 characters long";
  }
  return true;
}

export async function logoutAction() {
  await signOut({
    redirectTo: RouteHelper.getRouteInfo({ route: RouteHelper.auth }),
  });
}
