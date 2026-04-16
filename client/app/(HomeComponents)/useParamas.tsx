
import BlogList from "./blogList";

export const dynamic = "force-dynamic";

export default function UseParamas({ searchParams }: { searchParams: { user: any } }) {
  return <BlogList user={searchParams.user} />;
}