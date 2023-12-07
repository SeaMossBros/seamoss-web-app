import { Avatar, Flex, Loader, Select, Stack, Text } from '@mantine/core'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { useAuthors } from '@/queries/useAuthors'
import { ArticleFormData } from '@/types/ArticleForm'
import { getStrapiUploadUrl } from '@/utils/cms'

import { ArticleComponentCommonProps } from './common'

export type ArticleAuthorFieldProps = ArticleComponentCommonProps

const ArticleAuthorField: React.FC<ArticleAuthorFieldProps> = ({ mode }) => {
  const methods = useFormContext<ArticleFormData>()

  const { data: authors, isFetching } = useAuthors(
    {
      pagination: {
        pageSize: 1000,
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
              author.avatar.attributes.formats?.small?.url ?? author.avatar.attributes.url,
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
      )}
    />
  )
}

export default ArticleAuthorField
