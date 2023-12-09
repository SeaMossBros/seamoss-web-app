'use client'

import { Accordion, Box, Checkbox, Stack } from '@mantine/core'
import uniq from 'lodash/uniq'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import qs from 'qs'
import { FormEventHandler, useCallback } from 'react'

import { Category, Product_NoRelations } from '@/types/Product'
import { FilterOp, QueryParams } from '@/types/QueryParams'

export type ProductFiltersProps = {
  filters?: QueryParams<Product_NoRelations>['filters']
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ filters }) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const onFilter = useCallback(
    (_filters: QueryParams<Product_NoRelations>['filters']) => {
      const query: any = qs.parse(searchParams.toString())
      query.filters = _filters
      const search = qs.stringify(query)

      const url = `${pathname}?${search}`

      router.push(url)
    },
    [pathname, router, searchParams],
  )

  const onChange = useCallback<FormEventHandler<HTMLDivElement>>(
    (e) => {
      const field = e.target as HTMLElement
      const name = field.getAttribute('name')
      const value = field.getAttribute('value')

      switch (name) {
        case 'category': {
          const checked = (field as HTMLInputElement).checked
          const categoryFilter = (filters?.category as Partial<Record<FilterOp, any>>) ?? {}
          if (checked) {
            categoryFilter.$in = uniq([...(categoryFilter.$in ?? []), value])
          } else {
            categoryFilter.$in = uniq(
              categoryFilter.$in?.filter((category: Category) => category !== value) ?? [],
            )
          }
          onFilter({ ...filters, category: categoryFilter })
          break
        }
        default:
          break
      }
    },
    [filters, onFilter],
  )

  return (
    <Box onChange={onChange}>
      <Accordion>
        <Accordion.Item value="category">
          <Accordion.Control>Categories</Accordion.Control>
          <Accordion.Panel mt="md">
            <Stack>
              {Object.values(Category).map((category) => (
                <Checkbox
                  key={category}
                  name="category"
                  value={category}
                  label={category}
                  defaultChecked={(filters?.category as any)?.$in?.includes(category)}
                />
              ))}
            </Stack>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Box>
  )
}

export default ProductFilters
