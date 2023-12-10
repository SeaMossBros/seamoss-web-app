import { Flex, Input, RangeSlider, Stack, Text } from '@mantine/core'
import debounce from 'lodash/debounce'
import isNaN from 'lodash/isNaN'
import isNumber from 'lodash/isNumber'
import React, { ChangeEvent, useCallback, useMemo, useState } from 'react'

import { priceInput, priceInputWrapper } from './PriceFilter.css'

export type PriceFilterProps = {
  from?: number
  to?: number
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

const PriceFilter: React.FC<PriceFilterProps> = ({ from, to, onChange }) => {
  const [range, setRange] = useState<[number, number]>([from ?? 0, to ?? 100.02])

  const [min, max] = range

  const onFilter = useMemo(
    () =>
      debounce((_range: [number, number]) => {
        const [_from, _to] = _range
        onChange({
          target: {
            name: 'price',
            value: JSON.stringify(_range),
          } as any,
        } as any)
      }, 400),
    [onChange],
  )

  const onChangeMin = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const {
        target: { value },
      } = e
      if (!isNumber(parseFloat(value)) || isNaN(parseFloat(value))) return
      setRange((_range) => {
        const newRange: [number, number] = [parseFloat(value), _range[1]]
        onFilter(newRange)
        return newRange
      })
    },
    [onFilter],
  )

  const onChangeMax = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const {
        target: { value },
      } = e
      if (!isNumber(parseFloat(value)) || isNaN(parseFloat(value))) return
      setRange((_range) => {
        const newRange: [number, number] = [_range[0], parseFloat(value)]
        onFilter(newRange)
        return newRange
      })
    },
    [onFilter],
  )

  return (
    <Stack gap="md">
      <RangeSlider
        labelAlwaysOn={false}
        label={(value) => (value <= 100 ? `$${value}` : `$100+`)}
        marks={[
          {
            value: 0,
            label: '$0',
          },
          {
            value: 100.02,
            label: '$100+',
          },
        ]}
        onChange={setRange}
        onChangeEnd={onFilter}
        value={range}
        min={0}
        max={100.02}
        step={0.02}
        minRange={1}
      />
      <Flex wrap="wrap" mt="md" align="center">
        <Input
          placeholder="0"
          leftSection="$"
          classNames={{
            wrapper: priceInputWrapper,
            input: priceInput,
          }}
          type="number"
          min={0}
          max={max}
          value={min}
          onChange={onChangeMin}
        />
        <Text w={40} ta="center">
          &ndash;
        </Text>
        <Input
          placeholder="100+"
          leftSection="$"
          classNames={{
            wrapper: priceInputWrapper,
            input: priceInput,
          }}
          type="number"
          min={min}
          max={100}
          value={max > 100 ? 100 : max}
          onChange={onChangeMax}
        />
      </Flex>
    </Stack>
  )
}

export default PriceFilter
