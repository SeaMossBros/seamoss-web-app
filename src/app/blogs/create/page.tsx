import './CreateBlog.css'

import { useRouter } from 'next/navigation'
import React from 'react'

import BlogForm from '@/components/Blog/BlogForm'
import BlogService from '@/services/blog.service'
import { Blog } from '@/types/Blog'

const NewBlogPage: React.FC = () => {
  'use client'
  const router = useRouter()
  const blogService = new BlogService()

  const handleFormSubmit = async (blogData: Blog) => {
    try {
      const createdBlog = await blogService.create(blogData)
      console.log('Blog created successfully:', createdBlog)
      // Handle success (e.g., show notification, redirect)
      router.push(`/blogs/${createdBlog?.data?.id}`)
    } catch (error) {
      console.error('Failed to create blog:', error)
      // Handle error
    }
  }

  // TODO: Only let people with admin role see the page to create a blog post
  return (
    <div id="blog-create-page" style={{ padding: '20px' }}>
      <h1 id="new-blog-post-title">Create New Blog Post</h1>
      <BlogForm onSubmit={(blogData: Blog) => handleFormSubmit(blogData)} />
      <h5 id="light-text">Looks good! Go ahead and post when you are ready!</h5>
      <h6 id="light-text">
        More functionality coming soon, like scheduling the blog post to release on a future date...
      </h6>
    </div>
  )
}

export default NewBlogPage
