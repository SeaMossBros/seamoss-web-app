'use client'

import { AspectRatio, Card, Image, Stack, Text } from '@mantine/core'
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
  article: Omit<Article, 'content'>
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const {
    attributes: { cover, title, slug, introduction },
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
          {/* <ToolTip title={title}> */}
          <Text lineClamp={2} fw={700}>
            {title}
          </Text>
          {/* </ToolTip> */}
          <Markdown isIntroOnBlogsList={true}>
            {introduction
              ? sanitizeHtml(introduction.slice(0, 99)) + (introduction.length > 99 ? '...' : '')
              : ''}
          </Markdown>
        </Stack>
      </Card>
    </Link>
  )
}

export default ArticleCard
