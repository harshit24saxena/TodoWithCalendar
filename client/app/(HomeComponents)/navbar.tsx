export default function Navbar() {
    return (
        <nav className="flex justify-between items-center my-sm p-md pt-sm">
              <h1 className="text-black font-bold text-4xl ">Daily Task</h1>
            <svg className="w-5 h-5 cursor-pointer" viewBox="0 0 100 100">
                <line fill="black" stroke="black" strokeWidth="8" id="top" x1="10" y1="20" x2="90" y2="20" />
                <line fill="black" stroke="black" strokeWidth="8" id="middle" x1="10" y1="50" x2="90" y2="50" />
                <line fill="black" stroke="black" strokeWidth="8" id="bottom" x1="10" y1="80" x2="90" y2="80" />
            </svg>

        </nav>
    );
}      