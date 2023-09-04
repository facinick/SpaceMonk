
import { toast } from '@redwoodjs/web/toast'
import { Tag } from 'types/graphql'
import { createZustandChildrenStore } from './store'

type TagResponseType = Pick<Tag, '__typename' | 'id' | 'name'>

type State = {
    tagSearchTerm: string,
    tagsSearchResults: TagResponseType[]
    tags: TagResponseType[],
}

type Actions = {
    searchTag: (tagSearchTerm: string) => void
    setTagsSearchResults: (tags: TagResponseType[]) => void
    initTags: (tags: TagResponseType[]) => void
    addTag: (tag: TagResponseType) => void
    removeTag: (tag: TagResponseType) => void
    reset: () => void
}

type TagsStore = State & Actions

const initialState: State = {
    tagSearchTerm: '',
    tagsSearchResults: [],
    tags: [],
}

const useTagsStore = createZustandChildrenStore<TagsStore>()(
    (set, get) => ({
        ...initialState,
        searchTag: (tagSearchTerm: string) => {
            set({ tagSearchTerm })
        },
        initTags: (tags: TagResponseType[]) => {
            set({ tags })
        },
        setTagsSearchResults: (tagsSearchResults: TagResponseType[]) => {
            set({ tagsSearchResults })
        },
        addTag: (tag: TagResponseType) => {
            // Check if the tag is not already added
            if (!get().tags.find((t) => t.name === tag.name)) {
                set((state) => ({
                    tags: [...state.tags, tag],
                }));
            } else {
                toast.error(`Tag ${tag.name} is already added dumbass!`)
            }
        },
        removeTag: (tag: TagResponseType) => {
            set((state) => ({
                tags: state.tags.filter((t) => t.id !== tag.id),
            }));
        },
        reset: () => set(initialState),
    })
)

export { TagsStore, useTagsStore }

