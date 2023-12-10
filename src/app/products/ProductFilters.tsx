'use client'

import { Accordion, Box } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import uniq from 'lodash/uniq'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import qs from 'qs'
import { ChangeEventHandler, useCallback, useMemo } from 'react'

import CategoryFilter from '@/components/ProductFilters/CategoryFilter'
import PriceFilter from '@/components/ProductFilters/PriceFilter'
import { Category } from '@/types/Product'

import { chevron } from './ProductList.css'
import { ProductPageFilter } from './types'

export type ProductFiltersProps = {
  filters?: ProductPageFilter
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ filters }) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const onFilter = useCallback(
    (_filters: ProductPageFilter) => {
      const query: any = qs.parse(searchParams.toString())
      const newQuery = {
        ...query,
        ..._filters,
      }
      const search = qs.stringify(newQuery, {
        arrayFormat: 'indices',
      })

      const url = `${pathname}?${search}`

      router.replace(url)
    },
    [pathname, router, searchParams],
  )

  const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      const field = e.target
      const name = field.name
      const value = field.value

      const newFilters = { ...filters }

      switch (name) {
        case 'category': {
          const checked = field.checked
          if (checked) {
            newFilters.category = uniq([...(filters?.category ?? []), value as Category])
          } else {
            newFilters.category = uniq(
              newFilters.category?.filter((category: Category) => category !== value) ?? [],
            )
          }
          break
        }
        case 'price': {
          const range = JSON.parse(value)
          const [from, to] = range
          if (from) {
            newFilters.price_from = from
          }
          if (to) {
            if (parseFloat(to) > 100) {
              newFilters.price_to = undefined
              break
            }
            newFilters.price_to = to
          }
          break
        }
        default:
          break
      }

      onFilter(newFilters)
    },
    [filters, onFilter],
  )

  const defaultOpenedItems = useMemo(() => {
    const items: string[] = []
    if (filters?.category?.length) {
      items.push('category')
    }
    if (filters?.price_from || filters?.price_to) {
      items.push('price')
    }

    return items
  }, [filters?.category?.length, filters?.price_from, filters?.price_to])

  return (
    <Box>
      <Accordion
        defaultValue={defaultOpenedItems}
        chevron={<IconPlus />}
        classNames={{
          chevron: chevron,
        }}
        multiple
      >
        <Accordion.Item value="category">
          <Accordion.Control>Categories</Accordion.Control>
          <Accordion.Panel mt="md">
            <CategoryFilter categoryFilters={filters?.category} onChange={onChange} />
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="price">
          <Accordion.Control>Price</Accordion.Control>
          <Accordion.Panel mt="md">
            <PriceFilter from={filters?.price_from} to={filters?.price_to} onChange={onChange} />
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Box>
  )
}

export default ProductFilters
