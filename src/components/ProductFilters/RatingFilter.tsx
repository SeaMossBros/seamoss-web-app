import { Button, Flex, Rating, Text } from '@mantine/core'
import React, { useCallback, useState } from 'react'

export type RatingFilterProps = {
  rating?: number
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

const RatingFilter: React.FC<RatingFilterProps> = ({ rating, onChange }) => {
  const [value, setValue] = useState(rating)

  const _onChange = useCallback(
    (value: number) => {
      setValue(value)
      onChange({
        target: {
          name: 'rating',
          value: `${value}`,
        } as any,
      } as any)
    },
    [onChange],
  )

  const onClear = useCallback(() => {
    setValue(0)
    onChange({
      target: {
        name: 'rating',
        value: ``,
      } as any,
    } as any)
  }, [onChange])

  return (
    <Flex justify="space-between" align="center">
      <Flex>
        <Rating name="rating" size="md" value={value} onChange={_onChange} fractions={2} />
        <Text ml={9}>& up</Text>
      </Flex>
      <Button type="button" variant="subtle" color="gray" size="xs" onClick={onClear}>
        Clear
      </Button>
    </Flex>
  )
}

export default RatingFilter
