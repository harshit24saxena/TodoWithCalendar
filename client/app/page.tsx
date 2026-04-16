
import UseParamas from "./(HomeComponents)/useParamas";
import Navbar from "./(HomeComponents)/navbar";
import Addtask from "./(HomeComponents)/addTask";

export default function Home({
  searchParams,
}: {
  searchParams: { user: string };
}) {
  return (
    <>
      <Navbar />
      <div className="bg-foreground w-full min-h-[calc(90vh-100px)] p-md rounded-t-4xl overflow-hidden shadow-lg shadow-gray-700">
        <UseParamas searchParams={searchParams} />
      </div>
      <Addtask />
    </>
  );
}