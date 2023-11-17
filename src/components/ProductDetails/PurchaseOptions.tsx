import { Fieldset, SegmentedControl, SegmentedControlItem, Stack } from '@mantine/core'
import { useCallback, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'

import { ProductSelectionFormData } from '@/types/ProductForm'

const PurchaseOptions: React.FC = () => {
  const methods = useFormContext<ProductSelectionFormData>()

  const purchaseOptions = methods.watch('product.attributes.purchase_options')
  const selectedOption = methods.watch('purchaseOption')

  const selections = useMemo<SegmentedControlItem[]>(() => {
    return (
      purchaseOptions?.data?.map((option) => ({
        value: option.id.toString(),
        label: option.attributes.name,
      })) ?? []
    )
  }, [purchaseOptions?.data])

  const onChange = useCallback(
    (value: string) => {
      const option = purchaseOptions?.data?.find((opt) => opt.id.toString() === value)

      methods.setValue('purchaseOption', option)
    },
    [methods, purchaseOptions?.data],
  )

  if (!purchaseOptions?.data?.length) return null

  return (
    <Fieldset legend="Purchase Options">
      <Stack gap={0}>
        <SegmentedControl
          value={selectedOption?.id.toString()}
          onChange={onChange}
          data={selections}
        />
      </Stack>
    </Fieldset>
  )
}

export default PurchaseOptions
