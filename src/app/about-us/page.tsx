import { Container, Overlay, Text, Title } from '@mantine/core'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { Metadata } from 'next'

import getQueryClient from '@/react-query/getQueryClient'
import SingleTypeService from '@/services/single-type.service'

import AboutUsImage from './AboutUsImage'
import { inner, title, wrapper } from './hero-image-background.css'

export const metadata: Metadata = {
  title: 'About Us | SeaTheMoss',
}

const AboutUsPage: React.FC = async () => {
  const queryClient = getQueryClient()
  const singleTypeService = new SingleTypeService()

  await queryClient.prefetchQuery({
    queryKey: SingleTypeService.queryKeys.getAboutUsPageData(),
    queryFn: () => singleTypeService.getAboutUsPageData(),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className={wrapper}>
        <div className={inner}>
          <Overlay color="#1a1b1e" opacity={0.65} zIndex={1} />
        </div>
      </div>

      <Title className={title}>About Us</Title>
      <Container w={'72%'} pt={54}>
        <Text fw={400}>
          Sea The Moss is family owned and operated by Nubia and her young adult children: Elijah,
          Ras and Yanine.
        </Text>
        <br />
        <Text fw={400}>
          Our family of entrepreneurs not only has decades worth of building successful businesses,
          we equally have a deep love for overseas living and traveling abroad. We have lived in
          Puerto Rico and Costa Rica in the past and also travel yearly to various countries when
          taking breaks from our day to day life on the East Coast. Not to mention, our love for
          holistic, healthy living. Incorporating natural food and holistic healing modalities along
          the way has always been a priority.
        </Text>
        <br />
        <Text fw={400}>
          Nubia has founded, owned and operated two successful holistic based businesses over the
          past 23 years. One in her hometown Washington, DC . The other in the NYC tri-state area
          where she currently resides. As an Integrative Nutrition Health Coach (IIN) she has a deep
          understanding of how diet and lifestyle impact overall health. She works with her
          clientele one -on-one to help them achieve nutritional and holistic lifestyle goals. Nubia
          values building interpersonal relationships and investing a genuine interest in the
          betterment of her clientele.
        </Text>
        <br />
        <AboutUsImage index={0} />
        <Text fw={400}>
          After visiting Belize and learning of the exceptionally clean and sustainable Seamoss
          growing in protected ocean waters, it was no surprise when Nubia took an immediate
          interest in establishing a relationship with the local seamoss farmers.
        </Text>
        <br />
        <Text fw={400}>
          We took the time to nurture our relationship with the farmers in order to get a true
          understanding of the work and determination they personally invest to properly and
          respectfully harvest seamoss in their community.
        </Text>
        <br />
        <Text fw={400}>
          We also took the time to volunteer and get our hands dirty, or better yet, our bodies wet
          to truly understand the manual labor and commitment necessary to locate and harvest
          seamoss in the ocean. (see fun pics on our blog!)
        </Text>
        <br />
        <Text fw={400}>
          Here&apos;s what we learned about the seamoss grown and harvested in Belize and why we
          took a special interest in investing in Belizean seamoss:
        </Text>
        <br />
        <Text fw={400}>
          {'   '}- Belizean seamoss grows in pristine and protected ocean waters avoiding contact
          with any toxic metals and pollutants.
        </Text>
        <br />
        <Text fw={400}>
          {'   '}- There are no dirty water or sewage runoffs from resorts, tourist or residential
          areas contaminating the waters.
        </Text>
        <br />
        <Text fw={400}>
          {'   '}- The Belizean seaweed has been officially 3rd party tested and we have the results
          to prove its purity and cleanliness.
        </Text>
        <br />
        <Text fw={400}>
          {'   '}- Kappaphycus alvarezii (Eucheuma cottonii) is the type of seamoss we are currently
          harvesting from Belize and it makes 50% more gel than any other species of seamoss.
        </Text>
        <br />
        <Text fw={400}>
          {'   '}- When purchasing directly from the farming cooperative it puts the money directly
          into the hands of the local farmers positively impacting their daily lives.
        </Text>
        <br />
        <Text fw={400}>
          {'   '}- Belizean Seamoss is exclusive. Access is not given easily. Export licenses aren’t
          easily obtainable. We are proud to be 1 of 5 limited Belizean seamoss suppliers outside of
          Belize.
        </Text>
        <br />
        <Text fw={400}>
          For all the reasons listed above we take pride in providing top notch, unbelizable 😄
          seamoss products to contribute to your health goals.
        </Text>
        <br />
        <Text fw={400}>Thank you for trusting and supporting our family business!</Text>
      </Container>
    </HydrationBoundary>
  )
}

export default AboutUsPage
