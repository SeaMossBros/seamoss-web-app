"use client"
import { useEffect, useState } from 'react';
import { Blog } from '@/types/Blog'; // Adjust path as necessary
// Import components for displaying individual blog entries

const BlogsList: React.FC = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('http://localhost:1337/api/blogs', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                }); // Adjust URL as necessary
                if (response.ok) {
                    const data = await response.json();
                    if (data && Array.isArray(data)) {
                      setBlogs(data);
                    } else {
                      console.error('Unexpected response structure:', data);
                    }
                } else {
                    console.error('API request failed:', response.status, response.statusText);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching blogs:', error);
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    if (loading) return <div>Loading...</div>;
    console.log('blogs to render', blogs);
    if (!Array.isArray(blogs)) return <div>Error loading blogs.</div>;

    return (
        <div>
            {blogs.map(blog => (
            <div key={blog.id}>
                <h2>{blog.title}</h2>
                {/* Other blog details */}
            </div>
            ))}
        </div>
    );
};

export default BlogsList;
