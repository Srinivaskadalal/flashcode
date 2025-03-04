"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface Blog {
  _id: string;
  title: string;
  description: string;
  author: string;
  createdAt: string;
  imageUrl?: string;
  readTime?: string;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/blogs")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-gray-400 text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">📖 Kent State Blogs</h2>

      {blogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Featured Blog (Large Card) */}
          <Link href={`/blogs/${blogs[0]._id}`} className="md:col-span-2">
            <Card className="overflow-hidden hover:shadow-lg transition-all cursor-pointer">
              {blogs[0].imageUrl && (
                <Image
                  src={blogs[0].imageUrl}
                  alt={blogs[0].title}
                  width={800}
                  height={400}
                  className="w-full h-64 object-cover"
                />
              )}
              <CardHeader>
                <CardTitle className="text-xl font-bold">
                  {blogs[0].title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 line-clamp-2">
                  {blogs[0].description}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  By {blogs[0].author} • {blogs[0].readTime || "5 min read"}
                </p>
              </CardContent>
            </Card>
          </Link>

          {/* Side Blogs (Small Cards) */}
          <div className="grid gap-4">
            {blogs.slice(1, 4).map((blog) => (
              <Link key={blog._id} href={`/blogs/${blog._id}`}>
                <Card className="hover:shadow-lg transition-all cursor-pointer flex flex-row gap-3 items-center">
                  {blog.imageUrl && (
                    <Image
                      src={blog.imageUrl}
                      alt={blog.title}
                      width={100}
                      height={100}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                  )}
                  <div className="p-4">
                    <p className="text-sm font-medium">{blog.title}</p>
                    <p className="text-xs text-gray-500">{blog.author}</p>
                    <p className="text-xs text-gray-500">
                      {blog.readTime || "3 min read"}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-center">No blogs available.</p>
      )}

      {/* Button to Create a Blog */}
      <div className="mt-6 flex justify-center">
        <Link
          href="/blogs/create"
          className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700"
        >
          + Create Blog
        </Link>
      </div>
    </div>
  );
}
