'use client'
import './BlogsList.css'

// import { Image } from '@mantine/core'
// import { useQuery } from '@tanstack/react-query'
import React from 'react'

// import { useService } from '@/hooks/useService'
// import BlogService from '@/services/blog.service'
import { Blog } from '@/types/Blog'
import { QueryParams } from '@/types/QueryParams'

export type BlogListProps = {
  queryParams: QueryParams<Blog>
}

const BlogsList: React.FC<BlogListProps> = ({}) => {
  // const blogService = useService(BlogService)

  // const [blogs, setBlogs] = useState<Blog[]>([])
  // const [loading, setLoading] = useState<boolean>(true)

  // useEffect(() => {
  //   const fetchBlogs = async () => {
  //     try {
  //       const response = await fetch('http://localhost:1337/api/blogs', {
  //         method: 'GET',
  //         headers: { 'Content-Type': 'application/json' },
  //       })
  //       if (response.ok) {
  //         const data = await response.json()
  //         if (data && Array.isArray(data)) {
  //           setBlogs(data)
  //         } else {
  //           console.error('Unexpected response structure:', data)
  //         }
  //       } else {
  //         console.error('API request failed:', response.status, response.statusText)
  //       }
  //       setLoading(false)
  //     } catch (error) {
  //       console.error('Error fetching blogs:', error)
  //       setLoading(false)
  //     }
  //   }
  //   fetchBlogs()
  // }, [])

  // const { data: blogs } = useQuery({
  //   queryKey: BlogService.queryKeys.list(queryParams),
  //   queryFn: () => blogService.list(queryParams),
  // })

  // console.log('blogs to render', blogs)
  // if (!blogs || !blogs.data || blogs.data.length < 1) return <div>Error loading blogs.</div>

  return (
    <div>
      {/* {blogs.data.map((blog) => (
        <div key={blog.id}>
          <h2>{blog.id}</h2>
          <Image src={blog.attributes.mainImage} alt="main blog image" />
        </div>
      ))} */}
    </div>
  )
}

export default BlogsList
