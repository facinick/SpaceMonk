interface Props {
  children?: React.ReactNode;
}

export const TagsInputBoxComponent = ({ children }: Props): JSX.Element => {
  return (
    <div className="w-full flex flex-col justify-center items-start">
      {children}
    </div>
  );
}