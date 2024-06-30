import { PropsWithChildren } from 'react'
import { default as ReactMarkdown, Options } from 'react-markdown'
import remarkGfm from 'remark-gfm'

const Markdown: React.FC<PropsWithChildren<Options>> = (props) => {
  return <ReactMarkdown remarkPlugins={[remarkGfm]} {...props} className={'markdown-content'} />
}

export default Markdown
