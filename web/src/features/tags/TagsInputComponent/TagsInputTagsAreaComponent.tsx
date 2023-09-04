import { useTagsStore } from "src/store/zustand/tagsStore";
import { DismissibleChip } from "src/ui/chip/DismissibleChip";
import { generateUUID } from "src/utils/math";

interface Props {
  children?: React.ReactNode;
}

export const TagsInputTagsAreaComponent = ({ children }: Props): JSX.Element => {
  
  const {tags, removeTag} = useTagsStore()

  const padding = tags.length === 0 ? "p-0" : "pb-4"
  
  return (
    <>
      <div className={`flex flex-row flex-wrap gap-y-2 ${padding}`}>
        {tags.map((value, index, array) => {
          return (<DismissibleChip onClick={() => removeTag(value)} key={generateUUID()} >{value.name}</DismissibleChip>)
        })}
      </div>
    </>
  );
}