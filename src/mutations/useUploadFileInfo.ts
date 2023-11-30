import { useMutation } from '@tanstack/react-query'

import { useService } from '@/hooks/useService'
import FileService from '@/services/file.service'
import { Media_Plain } from '@/types/Media'

export const useUploadFileInfo = () => {
  const fileService = useService(FileService)

  return useMutation({
    mutationFn: (data: { id: number; info: Pick<Media_Plain, 'alternativeText'> }) =>
      fileService.uploadFileInfo(data.id, data.info),
  })
}
