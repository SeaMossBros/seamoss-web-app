'use client'

import { Image, rem, useMantineColorScheme, useMantineTheme } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { Spotlight, SpotlightActionGroupData } from '@mantine/spotlight'
import { IconSearch } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'

import { ROUTE_PATHS } from '@/consts/route-paths'
import { useSearch } from '@/queries/useSearch'
import { getStrapiUploadUrl } from '@/utils/cms'

const SpotlightController: React.FC = () => {
  const { colors } = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDarkTheme = colorScheme === 'dark';
  const getCorrectPrimaryColor = () => isDarkTheme ? colors.red[9] : colors.teal[9];
  const [query, setQuery] = useState<string>('')
  const [debouncedQuery] = useDebouncedValue(query, 400)

  const router = useRouter()

  const { data: result } = useSearch(
    debouncedQuery,
    {
      populate: {
        products: ['thumbnail'],
        articles: ['cover'],
      },
      pagination: {
        products: {
          page: 1,
          pageSize: 5,
        },
        articles: {
          page: 1,
          pageSize: 5,
        },
      },
    },
    {
      enabled: Boolean(debouncedQuery),
    },
  )

  const actionGroups = useMemo<SpotlightActionGroupData[]>(
    () => [
      {
        group: 'Products',
        actions:
          result?.products?.data?.map?.((product) => {
            const thumbnailUrl = product.thumbnail?.formats?.small?.url ?? product.thumbnail?.url

            return {
              id: product.id.toString(),
              label: product.name,
              description: product.description,
              leftSection: (
                <Image
                  src={thumbnailUrl ? getStrapiUploadUrl(thumbnailUrl) : ''}
                  alt={product.name}
                  placeholder="/images/placeholder.webp"
                  fit="contain"
                  w={80}
                />
              ),
              onClick: () =>
                router.push(ROUTE_PATHS.PRODUCT.SLUG.replaceAll('{slug}', product.slug)),
            }
          }) ?? [],
      },
      {
        group: 'Articles',
        actions:
          result?.articles?.data?.map?.((article) => {
            const coverUrl = article.cover?.formats?.small?.url ?? article.cover.url

            return {
              id: article.id.toString(),
              label: article.title,
              description: article.introduction,
              leftSection: (
                <Image
                  src={coverUrl ? getStrapiUploadUrl(coverUrl) : ''}
                  alt={article.title}
                  placeholder="/images/placeholder.webp"
                  fit="contain"
                  w={80}
                />
              ),
              onClick: () =>
                router.push(ROUTE_PATHS.BLOG.SINGULAR.replaceAll('{slug}', article.slug ?? '')),
            }
          }) ?? [],
      },
    ],
    [result?.articles?.data, result?.products?.data, router],
  )

  return (
    <Spotlight
      actions={actionGroups}
      nothingFound="Nothing found..."
      inputMode="search"
      filter={(_, a) => a}
      searchProps={{
        leftSection: <IconSearch style={{ width: rem(20), height: rem(20), color: getCorrectPrimaryColor() }} stroke={1.5} />,
        placeholder: 'Search...',
      }}
      query={query}
      onQueryChange={setQuery}
      scrollable
      clearQueryOnClose
      closeOnActionTrigger
    />
  )
}

export default SpotlightController
