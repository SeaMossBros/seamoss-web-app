import { useMutation } from '@tanstack/react-query'

import { useService } from '@/hooks/useService'
import FileService from '@/services/file.service'

export const useUploadFile = () => {
  const fileService = useService(FileService)

  return useMutation({
    mutationFn: (files: File[]) => fileService.upload(files),
  })
}
