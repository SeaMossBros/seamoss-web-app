import { Image } from '@mantine/core'

import { ArticleComponentCommonProps } from './common'

export type ArticleCoverFieldProps = ArticleComponentCommonProps

const ArticleCoverField: React.FC<ArticleCoverFieldProps> = () => {
  return <Image src={'/images/placeholder.webp'} alt="sss" w="100%" mah={250} fit="contain" />
}

export default ArticleCoverField
