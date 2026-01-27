"use server";
import { revalidatePath } from "next/cache";

export default async function Revalidatepathfn(link) {
  revalidatePath(link);
}
