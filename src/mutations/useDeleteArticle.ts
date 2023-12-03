import { notifications } from '@mantine/notifications'
import { useMutation } from '@tanstack/react-query'

import { useService } from '@/hooks/useService'
import BlogService from '@/services/blog.service'

export const useDeleteArticle = () => {
  const blogService = useService(BlogService)

  return useMutation({
    mutationFn: (id: number) => blogService.delete(id),
    onError: (err) => {
      console.error(err)
      notifications.show({
        color: 'red',
        message: 'Unexpected error occurred',
      })
    },
    onSuccess: (data) => {
      if (data.error) {
        console.error(data.error)
        notifications.show({
          color: 'red',
          message: 'Unexpected error occurred',
        })
      }
    },
  })
}
