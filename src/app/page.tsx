import { authOptions } from "@/lib/next-auth";
import { getServerSession } from "next-auth";

const Home = async () => {
  const session = await getServerSession(authOptions);
  console.log(session?.user);

  return <div>Home</div>;
};

export default Home;
