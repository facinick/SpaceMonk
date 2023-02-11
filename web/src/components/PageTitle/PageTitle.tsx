interface PageProps {
  title: string
}

const PageTitle = (props: PageProps) => {
  return (
    <h5 className=" mb-8 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{props.title}</h5>
  )
}

export default PageTitle
