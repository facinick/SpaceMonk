type NoProsePostLayoutProps = {
  children?: React.ReactNode
}

const NoProsePostLayout = ({ children }: NoProsePostLayoutProps) => {
  return <div className={`w-full  max-w-[768px]`}>{children}</div>
}

export default NoProsePostLayout
