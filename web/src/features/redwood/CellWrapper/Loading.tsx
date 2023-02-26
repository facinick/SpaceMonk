interface ComponentProps {}

export const CellLoading = (props: ComponentProps) => {
  return (
    <div className="alert alert-warning max-w-md shadow-lg">
      <progress className="progress progress-primary w-56"></progress>
    </div>
  )
}
