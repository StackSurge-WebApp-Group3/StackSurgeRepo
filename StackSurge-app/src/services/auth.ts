import { User } from "../types/User";
import axiosClient from "./axiosClient";

export async function fetchUserProfile() {
  const { data } = await axiosClient.get<User>("/api/users/profile");

  return data;
}

export async function signUp(
  userData: Pick<User, "firstName" | "lastName" | "email" | "interests"> & {
    password: string;
  }
) {
  const { data } = await axiosClient.post<User>("/api/users", userData);

  return data;
}

export async function signIn(email: string, password: string) {
  const { data } = await axiosClient.post<{
    token: string;
    user: User;
  }>("/auth/signin", { email, password });

  return data;
}

export async function signOut() {
  await axiosClient.post("/auth/signout");
}
