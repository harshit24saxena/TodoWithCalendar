
import BlogList from "./(HomeComponents)/blogList";
import InputForm from "./(HomeComponents)/inputForm";
import Navbar from "./(HomeComponents)/navbar";
import Addtask from "./(HomeComponents)/addTask";

export default function Home() {
  return ( <>
  <Navbar />
  <div className="bg-foreground w-full p-md rounded-t-4xl overflow-hidden">
  {/* <InputForm /> */}
  <BlogList  />  
  </div>
  <Addtask />
  </> );
}
