
export default function BlogList() {
  const cardVariant = [
  "bg-(--accent-peach) text-[color-mix(in_srgb,var(--accent-peach),black_20%)] shadow-[-10px_0_color-mix(in_srgb,var(--accent-peach),black_10%)] drop-shadow-lg",
  "bg-(--accent-orange) text-[color-mix(in_srgb,var(--accent-orange),black_20%)] shadow-[-10px_0_color-mix(in_srgb,var(--accent-orange),black_10%)] drop-shadow-lg",
  "bg-(--accent-yellow) text-[color-mix(in_srgb,var(--accent-yellow),black_20%)] shadow-[-10px_0_color-mix(in_srgb,var(--accent-yellow),black_10%)] drop-shadow-lg",
];
const blog = [
  {
    title: "Understanding React Server Components",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
  },
  {
    title: "The Power of Tailwind CSS",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
  },
  {
    title: "Mastering TypeScript",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
  },
  {
    title: "Building Accessible Web Apps",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
  },
  {
    title: "Next.js App Router Guide",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
  },
];


  return (
        <div>
            {blog.map((item, i) => {
                return (
                    <div key={i} className={`flex flex-col gap-2 p-8 my-6 rounded-2xl ${cardVariant[i % cardVariant.length]}`}>
                        <p className="font-bold "> {item.title} </p>
                        <h1 className="text-(--text-primary)">{item.description}</h1>
                    </div> 

                )
            })}

    </div>
  ); 
}