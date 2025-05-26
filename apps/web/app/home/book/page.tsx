import { redirect } from "next/navigation";

export default async function BookPage() {
  redirect("/home/book/category");
}
