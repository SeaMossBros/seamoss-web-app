import { rem } from '@mantine/core'
import { Spotlight } from '@mantine/spotlight'
import { IconSearch } from '@tabler/icons-react'

const SpotlightController: React.FC = () => {
  return (
    <Spotlight
      actions={[]}
      nothingFound="Nothing found..."
      highlightQuery
      searchProps={{
        leftSection: <IconSearch style={{ width: rem(20), height: rem(20) }} stroke={1.5} />,
        placeholder: 'Search...',
      }}
    />
  )
}

export default SpotlightController
