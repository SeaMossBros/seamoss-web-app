"use client"
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './CreateBlog.css';
import BlogService from '@/services/blog.service';
import { Blog } from '@/types/Blog';
import BlogForm from '@/components/Blog/BlogForm';

export const NewBlogPage: React.FC = () => {
    const router = useRouter();
    const blogService = new BlogService();

    const handleFormSubmit = async (blogData: Blog) => {
        try {
            const createdBlog = await blogService.create(blogData);
            console.log('Blog created successfully:', createdBlog);
            // Handle success (e.g., show notification, redirect)
            router.push(`/blogs/${createdBlog?.data?.id}`)
        } catch (error) {
            console.error('Failed to create blog:', error);
            // Handle error
        }
    };

    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch('/api/data');
          // handle response
        };
      
        fetchData();
    }, []);

    // TODO: Only let people with admin role see the page to create a blog post
    return (
        <div id='blog-create-page' style={{ padding: '20px' }}>
            <h1 id='new-blog-post-title'>Create New Blog Post</h1>
            <BlogForm onSubmit={(blogData) => handleFormSubmit(blogData)} />
            <h5 id='light-text'>Looks good! Go ahead and post when you're ready!</h5>
            <h6 id='light-text'>More functionality coming soon, like scheduling the blog post to release on a future date...</h6>
        </div>
    );
};
