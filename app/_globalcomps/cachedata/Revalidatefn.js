import { revalidateTag } from "next/cache";

function Revalidatefn(tags) {
  tags.forEach((tag) => {
    if (process.env.NODE_ENV === "development") {
      revalidateTag(tag);
    }
    if (process.env.NODE_ENV === "production") {
      revalidateTag(tag, "max");
    }
  });
}

export default Revalidatefn;
