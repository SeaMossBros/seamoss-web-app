import { Avatar, Flex, Group, Loader, Select, Stack, Text } from '@mantine/core'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { useAuthors } from '@/queries/useAuthors'
import { ArticleFormData } from '@/types/ArticleForm'
import { getStrapiUploadUrl } from '@/utils/cms'

import { ArticleComponentCommonProps } from './common'
import ToolTip from '../ToolTip'

export type ArticleAuthorFieldProps = ArticleComponentCommonProps

const ArticleAuthorField: React.FC<ArticleAuthorFieldProps> = ({ mode }) => {
  const methods = useFormContext<ArticleFormData>()

  const { data: authors, isFetching } = useAuthors(
    {
      pagination: {
        pageSize: 100,
      },
    },
    {
      enabled: mode === 'form',
    },
  )

  const author = methods.watch('author')

  if (mode === 'view') {
    if (!author) return null
    return (
      <Flex gap="md" align="center" justify="flex-start">
        {author.avatar ? (
          <Avatar
            src={getStrapiUploadUrl(
              author.avatar.attributes.formats?.small?.url
              || author.avatar.attributes.url
              || ''
            )}
            alt={author.name}
          />
        ) : null}
        <Stack gap={0}>
          <Text fz="xs" c="dimmed">
            Author
          </Text>
          <Text fz="md">{author.name}</Text>
        </Stack>
      </Flex>
    )
  }
  
  return (
    <Controller<ArticleFormData, 'author'>
      name="author"
      render={({ field: { value, onChange } }) => (
        <Group>
          {author ? 
          (
            // <ToolTip title={`Avatar for ${author.attributes.name}`} width='180px'>
              <Avatar
                src={getStrapiUploadUrl(
                  author.avatar.attributes.formats.small?.url
                  || author.avatar.attributes.formats.thumbnail?.url
                  || author.avatar.attributes.url
                  || ''
                  )}
                  alt={author.name}
                  size={27} // Set a size for the avatar
                  style={{ marginRight: '10px' }} // Add some spacing
              />
            // </ToolTip>
          ) : (
            // <ToolTip title='No Author Selected' width='180px' opacity={0.72}>
              <Avatar
                src={''}
                size={27} // Set a size for the avatar
                style={{ marginRight: '10px' }} // Add some spacing
                /> 
            // </ToolTip>
          )}
          <Select
            placeholder="Select author"
            value={value?.id.toString() ?? null}
            onChange={(val) => {
              const selected = authors?.data?.find((author) => `${author.id}` === val)

              onChange(selected)
            }}
          data={authors?.data?.map((author) => ({
            value: author.id.toString(),
            label: author.attributes.name,
          }))}
          rightSection={isFetching && <Loader size="xs" />}
        />
        </Group>
      )}
    />
  )
}

export default ArticleAuthorField
