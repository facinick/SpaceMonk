interface PageProps {
  title: string
}

const PageTitle = (props: PageProps) => {
  return (
    <h5 className="text-3xl font-bold">{props.title}</h5>
  )
}

export default PageTitle
