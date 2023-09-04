import { useTagsStore } from "src/store/zustand/tagsStore";
import { AddableChip } from "src/ui/chip/AddableChip";
import { generateUUID } from "src/utils/math";

interface Props {
  children?: React.ReactNode;
}

export const TagsInputTagsSuggessionComponent = ({ children }: Props): JSX.Element => {

  const { tagsSearchResults, addTag } = useTagsStore()

  return (
    <div className="flex flex-row flex-wrap p-4 pl-0 pr-0 gap-y-2">
      {tagsSearchResults.map((value, index, array) => {
        return (<AddableChip onClick={() => addTag(value)} key={generateUUID()}>{value.name}</AddableChip>)
      })}
    </div>
  );
}