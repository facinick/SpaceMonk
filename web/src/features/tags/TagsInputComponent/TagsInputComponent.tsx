import { useTagsStore } from "src/store/zustand/tagsStore";
import TagsCell from "../TagsCell";
import { TagsInputBoxComponent } from "./TagsInputBoxComponent";
import { TagsInputInputAreaComponent } from "./TagsInputInputAreaComponent";
import { TagsInputTagsAreaComponent } from "./TagsInputTagsAreaComponent";
import { TagsInputTagsSuggessionComponent } from "./TagsInputTagsSuggessionComponent";

interface Props {
    children?: React.ReactNode;
}

export const TagsInputComponent = ({ children }: Props): JSX.Element => {

    const { tagSearchTerm } = useTagsStore()

    return (
        <>
            <TagsInputBoxComponent>
                {/* display user added tags here */}
                <TagsInputTagsAreaComponent></TagsInputTagsAreaComponent>
                {/* display input area here */}
                <TagsInputInputAreaComponent></TagsInputInputAreaComponent>
                {/* display suggested popular tags as user types here */}               
                <TagsInputTagsSuggessionComponent></TagsInputTagsSuggessionComponent>
            </TagsInputBoxComponent>
            {/* this will just load popular tags and also allow u to create more tags / search more tags */}
            <TagsCell input={{ filter: tagSearchTerm, skip: 0, take: 5 }} />
        </>
    );
}