import React from "react";
import { MdModeEdit } from "react-icons/md";
import Nextimage from "@/app/_globalcomps/Nextimage";
import Link from "next/link";
import Deletebutton from "./Deletebutton";

function Card({ haveaccess, post }) {
  return (
    <div className="relative group">
      <Link href={`/main/Blogs/Preview/${post?._id}`}>
        <Nextimage
          src={post?.images[0]}
          alt={post?.title}
          width={300}
          height={300}
          className="w-full aspect-square object-cover"
        />
      </Link>
      <p className="text-center my-2 line-clamp-2">{post?.title}</p>
      {haveaccess && (
        <div className="absolute top-0 right-0 flex flex-col gap-2 lg:hidden lg:group-hover:flex p-1">
          <Link
            href={`/main/Blogs/Add?edit=${post?._id}`}
            className="bg-theme text-white rounded-full p-2"
          >
            <MdModeEdit />
          </Link>
          <Deletebutton post={post}/>
        </div>
      )}
    </div>
  );
}

export default Card;
