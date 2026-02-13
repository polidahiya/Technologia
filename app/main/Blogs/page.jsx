import React from "react";
import Verification from "@/lib/verification";
import { unstable_cache } from "next/cache";
import { getcollection } from "@/lib/db";
import { CACHE_TIME } from "@/lib/data";
import Card from "./Card";
import Newbutton from "./Newbutton";
import Link from "next/link";

async function page() {
  const tokenres = await Verification();
  let haveaccess = false;
  if (
    tokenres?.verified &&
    (tokenres.usertype == "admin" ||
      tokenres.permission.includes("Blogs_permission"))
  ) {
    haveaccess = true;
  }

  const getposts = unstable_cache(
    async () => {
      try {
        const { blogscollection } = await getcollection();
        const posts = await blogscollection
          .find({}, { delta: 0 })
          .sort({ lastupdated: -1 })
          .toArray();
        posts.forEach((item) => (item._id = item._id.toString()));
        return posts;
      } catch (error) {
        return [];
      }
    },
    ["Blogs"],
    { revalidate: CACHE_TIME, tags: ["Blogs", "all"] },
  );

  const posts = await getposts();
  return (
    <div className="pt-12 px-5 md:px-8 max-w-6xl mx-auto">
      <div className="flex items-center gap-2 text-sm">
        <Link href={"/main"} prefetch={false}>
          Home
        </Link>{" "}
        / <p className="capitalize text-theme">Blogs</p>
      </div>
      <div>
        <h1 className="font-tenor text-4xl md:text-6xl capitalize pt-10">
          Blogs
        </h1>
      </div>
      <div className="py-10 min-h-96 mt-10">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
          {haveaccess && <Newbutton />}
          {posts.map((post, i) => (
            <Card key={i} haveaccess={haveaccess} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default page;
