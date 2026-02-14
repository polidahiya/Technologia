import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { getcollection } from "@/lib/db";
import { unstable_cache } from "next/cache";
import Link from "next/link";
import { CACHE_TIME } from "@/lib/data";
import Nextimage from "@/app/_globalcomps/Nextimage";

const getblogdata = async (id) => {
  return unstable_cache(
    async () => {
      try {
        const { blogscollection, ObjectId } = await getcollection();
        const blog = await blogscollection.findOne({ _id: new ObjectId(id) });
        blog._id = blog._id.toString();
        return blog;
      } catch (error) {
        console.log(error);
      }
    },
    [`Blog-${id}`],
    { revalidate: CACHE_TIME, tags: [`Blog-${id}`, "blogs", "all"] },
  )();
};

export default async function BlogPage({ params }) {
  const { id } = await params;

  let blogdata = (await getblogdata(id)) || {};

  const converter = new QuillDeltaToHtmlConverter(blogdata?.delta, {});
  const html = converter.convert();

  return (
    <div className="pt-12 px-5 md:px-8 max-w-6xl mx-auto">
      <div className="flex items-center gap-2 text-sm">
        <Link href="/main" prefetch={false}>
          Home
        </Link>{" "}
        /{" "}
        <Link href="/main/Blogs" prefetch={false}>
          Blogs
        </Link>{" "}
        / <p className="capitalize text-theme">Preview</p>
      </div>
      <div>
        <h1 className="font-tenor text-4xl md:text-4xl capitalize pt-10">
          {blogdata?.title}
        </h1>
      </div>
      <Nextimage
        src={blogdata?.images[0]}
        alt={blogdata?.title}
        height={400}
        width={400}
        className="mt-5 mb-3 w-full max-w-2xl rounded-md object-contain"
      />
      <div
        dangerouslySetInnerHTML={{ __html: html }}
        className="py-10 min-h-96 mt-10 text"
      />
    </div>
  );
}

export const generateMetadata = async ({ params }) => {
  const { id } = await params;
  let blogdata = (await getblogdata(id)) || {};

  return {
    title: blogdata?.title,
    description: blogdata?.desc,
    keywords: blogdata?.keywords,
    openGraph: {
      images: blogdata?.images?.[0],
    },
    // alternates: {
    //   canonical: "https://tecknologia.in/main/product/" + id,
    // },
  };
};
