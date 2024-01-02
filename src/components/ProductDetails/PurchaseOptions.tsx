import { Fieldset, Paper, Radio, SegmentedControl, Stack } from '@mantine/core'
import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'

import { ProductSelectionFormData } from '@/types/ProductForm'
import { PurchaseType } from '@/types/PurchaseOption'

const PurchaseOptions: React.FC = () => {
  const methods = useFormContext<ProductSelectionFormData>()

  const purchaseOptions = methods.watch('product.attributes.purchase_options')
  const selectedOption = methods.watch('purchaseOption')

  const onChangeType = useCallback(
    (value: string) => {
      const option = purchaseOptions?.data?.find((opt) => opt.attributes.type === value)

      methods.setValue('purchaseOption', option)
    },
    [methods, purchaseOptions?.data],
  )

  const onChangeOption = useCallback(
    (value: string) => {
      const option = purchaseOptions?.data?.find((opt) => opt.id.toString() === value)

      methods.setValue('purchaseOption', option)
    },
    [methods, purchaseOptions?.data],
  )

  if (!purchaseOptions?.data?.length) return null

  return (
    <Fieldset legend="Purchase Options" style={{userSelect: 'none'}}>
      <Stack gap="md">
        <SegmentedControl
          value={selectedOption?.attributes.type}
          onChange={onChangeType}
          data={[
            {
              value: PurchaseType.Recurring,
              label: 'Subscribe',
            },
            {
              value: PurchaseType.OneTime,
              label: 'One-time purchase',
            },
          ]}
        />
        <Paper>
          {selectedOption?.attributes.type === PurchaseType.Recurring ? (
            <Radio.Group value={selectedOption?.id.toString()} onChange={onChangeOption}>
              <Stack gap="sm">
                {purchaseOptions.data
                  .filter((option) => option.attributes.type === PurchaseType.Recurring)
                  .map((option) => (
                    <Radio
                      key={option.id}
                      value={option.id.toString()}
                      label={option.attributes.name}
                    />
                  ))}
              </Stack>
            </Radio.Group>
          ) : null}
        </Paper>
      </Stack>
    </Fieldset>
  )
}

export default PurchaseOptions
