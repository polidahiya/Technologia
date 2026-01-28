import { SearchX } from "lucide-react";
import Link from "next/link";

export default function NoResults({
  title = "No products found",
  description = "Try adjusting your filters or search keywords.",
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted shadow-sm">
        <SearchX className="h-8 w-8 opacity-70" />
      </div>

      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-sm text-muted-foreground max-w-md mb-6">
        {description}
      </p>

      <Link
        href={"/main/all?ReleaseDate=available"}
        replace
        className="rounded-full px-5 py-2 text-sm font-medium shadow-sm bg-cyan-600 text-white hover:bg-muted transition"
      >
        Clear filters
      </Link>
    </div>
  );
}
