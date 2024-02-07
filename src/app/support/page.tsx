import { Container, Text } from '@mantine/core'
import { Metadata } from 'next'
import GetInTouch from './GetInTouch'
import getQueryClient from '@/react-query/getQueryClient'
import HeroImage from '@/components/SupportHeroImage'
import SingleTypeService from '@/services/single-type.service'
import { wrapper, containerForm } from './styles.css'

export const metadata: Metadata = {
  title: 'Support | SeaTheMoss',
}

const SupportPage: React.FC = async () => {
  const queryClient = getQueryClient();
  const singleTypeService = new SingleTypeService();

  await queryClient.prefetchQuery({
    queryKey: SingleTypeService.queryKeys.getSupportPageData(),
    queryFn: () => singleTypeService.getSupportPageData(),
  })

  return (
    <Container className={wrapper}>
      <HeroImage />
      <div className={containerForm}>
        <GetInTouch />
      </div>
    </Container>
  )
}

export default SupportPage
