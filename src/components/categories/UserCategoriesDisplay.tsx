import { authOptions } from "@/lib/next-auth";
import { Session, getServerSession } from "next-auth";
import Link from "next/link";
import { Button } from "../ui/button";
import { getUserCategories } from "@/lib/utils/getUserCategories";

type UserCategoriesDisplayProps = {
  type: "INCOME" | "EXPENSE" | "ALL";
  searchQuery: string;
};

const UserCategoriesDisplay = async ({
  type,
  searchQuery,
}: UserCategoriesDisplayProps) => {
  const { user } = (await getServerSession(authOptions)) as Session;

  const userCategories = await getUserCategories(user.id, type, searchQuery);

  return (
    <div className="flex items-center py-2 rounded-md gap-2 flex-wrap">
      {!userCategories.length && (
        <p className="text-sm text-gray-500">No results found.</p>
      )}
      {userCategories.map((category) => (
        <Button
          asChild
          variant={category.type === "INCOME" ? "default" : "destructive"}
          key={category.id}
        >
          <Link href={`/categories/${category.id}`}>
            <span>{category.name}</span>
          </Link>
        </Button>
      ))}
    </div>
  );
};

export default UserCategoriesDisplay;
