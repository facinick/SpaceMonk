import { ChangeEvent, useEffect, useState } from "react";
import { PlusIcon } from "src/features/Icons/icons";
import { useTagsStore } from "src/store/zustand/tagsStore";

interface Props {
  children?: React.ReactNode;
}

export const TagsInputInputAreaComponent = ({ children }: Props): JSX.Element => {

  const { tagSearchTerm, searchTag, addTag, tagsSearchResults } = useTagsStore()

  const [buttonDisabled, setButtonDisabled] = useState(true)

  useEffect(() => {

    if (tagSearchTerm === "") {
      setButtonDisabled(true)
    } else {
      setButtonDisabled(false)
    }



  }, [tagSearchTerm])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value.trim() ;
    searchTag(newSearchTerm);
  };

  const onButtonClick = () => {

    let foundIndex = -1;

    foundIndex = tagsSearchResults.findIndex((tag) => tag.name === tagSearchTerm)

    // the searched tag is already in suggestions, so use that instead of
    // asking backend to create new one with same name causing trouble
    if (foundIndex !== -1) {
      addTag(tagsSearchResults[foundIndex])
    } 
    // else ask backend to create new with this name
    else {
      addTag({
        __typename: "Tag",
        id: -1,
        name: tagSearchTerm
      })
    }
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
        <button title="Create Tag" onClick={onButtonClick} disabled={buttonDisabled} className="absolute btn-sm btn-secondary btn-circle w-8 h-8 shrink-0 flex justify-center items-center top-0 right-2 bottom-0 m-auto">
          <PlusIcon />
        </button>
      </div>
    </>
  );
}