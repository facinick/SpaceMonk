import { ChangeEvent, useEffect, useState } from "react";
import { PlusIcon } from "src/features/Icons/icons";
import { useTagsStore } from "src/store/zustand/tagsStore";

interface Props {
  children?: React.ReactNode;
}

export const TagsInputInputAreaComponent = ({ children }: Props): JSX.Element => {

  const { tagSearchTerm, searchTag, addTag } = useTagsStore()

  const [buttonDisabled, setButtonDisabled] = useState(true)

  useEffect(() => {

    if(tagSearchTerm === "") {
        setButtonDisabled(true)
    }else {
        setButtonDisabled(false)
    }

  }, [tagSearchTerm])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    searchTag(newSearchTerm);
  };

  const onButtonClick = () => {
    addTag({
        __typename: "Tag",
        id: -1,
        name: tagSearchTerm
    })
  }

  return (
    <>
    <div className="relative">
      <input
        onChange={handleInputChange}
        value={tagSearchTerm}
        type="text"
        placeholder="Find / make new tags 🏷️"
        className="input input-bordered w-full max-w-xs pr-[46px] rounded-full"
      />
      <button onClick={onButtonClick} disabled={buttonDisabled} className="absolute btn-sm btn-secondary btn-circle w-8 h-8 shrink-0 flex justify-center items-center top-0 right-2 bottom-0 m-auto">
        <PlusIcon />
      </button>
    </div>
    </>
  );
}