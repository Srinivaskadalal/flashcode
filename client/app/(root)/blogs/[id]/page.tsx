// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";

// interface Blog {
//   _id: string;
//   title: string;
//   content: string;
//   created_at: string;
// }

// export default function BlogDetail() {
//   const [blog, setBlog] = useState<Blog | null>(null);
//   const router = useRouter();
//   const { id } = router.query;

//   useEffect(() => {
//     if (id) {
//       fetch(`http://localhost:5000/blogs/${id}`)
//         .then((res) => res.json())
//         .then((data) => setBlog(data))
//         .catch((error) => console.error("Error fetching blog:", error));
//     }
//   }, [id]);

//   if (!blog) return <p className="text-center mt-8">Loading...</p>;

//   return (
//     <div className="container mx-auto p-8">
//       <h1 className="text-4xl font-bold">{blog.title}</h1>
//       <p className="text-gray-600 mt-2">
//         Published on {new Date(blog.created_at).toLocaleDateString()}
//       </p>
//       <div className="mt-4 text-lg">{blog.content}</div>
//     </div>
//   );
// }
