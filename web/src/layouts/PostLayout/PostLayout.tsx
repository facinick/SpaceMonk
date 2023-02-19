import { prose_classes } from 'src/features/editor/TIpTapEditor'

type PostLayoutProps = {
  children?: React.ReactNode
}

const PostLayout = ({ children }: PostLayoutProps) => {
  return (
    <div className={`${prose_classes} w-full max-w-[768px]`}>{children}</div>
  )
}

export default PostLayout
