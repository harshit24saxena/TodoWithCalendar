
import UseParamas from "./(HomeComponents)/useParamas";
import Navbar from "./(HomeComponents)/navbar";
import Addtask from "./(HomeComponents)/addTask";


export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ user?: string }>;
  
}) {
  const params = await searchParams;
  return (
    <>
      <Navbar />
      <div className="bg-foreground w-full min-h-[calc(90vh-100px)] p-md rounded-t-4xl overflow-hidden shadow-lg shadow-gray-700">
        <UseParamas searchParams={params} />
      </div>
      <Addtask />
    </>
  );
}