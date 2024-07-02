'use client'

import { AspectRatio, Avatar, Card, Flex, Image, Stack, Text } from '@mantine/core'
import Link from 'next/link'
import { useMemo } from 'react'
import sanitizeHtml from 'sanitize-html'

import { ROUTE_PATHS } from '@/consts/route-paths'
import { Article } from '@/types/Article'
import { getStrapiUploadUrl } from '@/utils/cms'
import { isImage } from '@/utils/common'

import Markdown from '../Markdown'
// import ToolTip from '../ToolTip'
import { card } from './ArticleCard.css'

export type ArticleCardProps = {
  article: Article
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const {
    attributes: {
      cover,
      title,
      slug,
      introduction,
      author,
      time_to_finish_reading,
      content,
      createdAt,
    },
  } = article

  const coverSrc = useMemo(
    () =>
      getStrapiUploadUrl(
        cover.data?.attributes.previewUrl ||
          cover.data?.attributes.formats?.medium?.url ||
          cover.data?.attributes.url ||
          '',
      ),
    [cover],
  )

  const href = useMemo(() => ROUTE_PATHS.BLOG.SINGULAR.replaceAll('{slug}', slug ?? ''), [slug])

  const getSanitizedAndFormattedText = (text: string) => {
    const sanitizedText = sanitizeHtml(text.trim().slice(0, 99))
    return sanitizedText + (text.trim().length > 99 ? '...' : '')
  }

  return (
    <Link href={href} passHref>
      <Card className={card}>
        <Card.Section>
          <AspectRatio ratio={1200 / 628}>
            {isImage(coverSrc) ? (
              <Image src={coverSrc} alt={cover.data?.attributes.alternativeText} />
            ) : (
              <video src={coverSrc} />
            )}
          </AspectRatio>
        </Card.Section>
        <Stack mt="sm" pb={9}>
          {author?.data.attributes.avatar && (
            <Flex wrap={'wrap'}>
              <Avatar
                src={getStrapiUploadUrl(
                  author?.data.attributes.avatar.data.attributes.formats?.small?.url ||
                    author?.data.attributes.avatar.data.attributes.url ||
                    '',
                )}
                alt={author?.data.attributes.name}
                mr={12}
                mb={9}
              />
              <Flex direction={'column'} wrap={'nowrap'}>
                <Text mt={0} fz={'md'} fw={500}>
                  {author?.data.attributes.name}
                </Text>
                <Text fz={'sm'}>
                  {new Date(createdAt).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </Text>
                <Text fz={10} fw={200}>
                  {time_to_finish_reading} min read
                </Text>
              </Flex>
            </Flex>
          )}
          {/* <ToolTip title={title}> */}
          <Text lineClamp={3} fw={700}>
            {title}
          </Text>
          {/* </ToolTip> */}
          <Markdown isIntroOnBlogsList={true}>
            {introduction
              ? getSanitizedAndFormattedText(introduction)
              : content
                ? getSanitizedAndFormattedText(content)
                : ''}
          </Markdown>
        </Stack>
      </Card>
    </Link>
  )
}

export default ArticleCard
