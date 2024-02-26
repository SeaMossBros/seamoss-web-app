import { Checkbox, Stack, useMantineColorScheme, useMantineTheme } from '@mantine/core'
import React from 'react'

import { Category } from '@/types/Product'

export type CategoryFilterProps = {
  categoryFilters?: Category[]
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categoryFilters, onChange }) => {

  return (
    <Stack>
      {Object.values(Category).map((category) => (
        <Checkbox
          key={category}
          name="category"
          value={category}
          label={category}
          defaultChecked={categoryFilters?.includes(category)}
          onChange={onChange}
        />
      ))}
    </Stack>
  )
}

export default CategoryFilter
