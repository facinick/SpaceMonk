import { prose_classes } from 'src/features/editor/TIpTapEditor'

interface ComponentProps {
  children?: React.ReactElement
}

const PostPageContentWrapper = ({ children }: ComponentProps) => {
  return <div className={`${prose_classes} w-full max-w-2xl `}>{children}</div>
}

export { PostPageContentWrapper }
