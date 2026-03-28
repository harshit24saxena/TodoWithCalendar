
export default function InputForm() {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-1">
            <form className="bg-(--cta) fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-2 flex flex-col gap-4 justify-center items-center w-2/3 h-2/3 p-sm">
                <input type="text" placeholder="Task" className="w-full h-full " />
                <input type="date" placeholder="Date" className="w-full h-full  border border-(--text-primary)" />
                <button type="submit" className="w-full h-full ">Add</button>
            </form>
        </div>
    );
}