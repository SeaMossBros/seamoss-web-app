import { notifications } from '@mantine/notifications'
import { useMutation } from '@tanstack/react-query'

import { useService } from '@/hooks/useService'
import BlogService from '@/services/blog.service'
import { Article_NoRelations } from '@/types/Article'

export const useUpdateArticle = () => {
  const blogService = useService(BlogService)

  return useMutation({
    mutationFn: (data: { id: number; article: Partial<Article_NoRelations> }) =>
      blogService.update(data.id, data.article),
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
        return
      }
      notifications.show({
        message: 'Article saved successfully!',
      })
    },
  })
}
