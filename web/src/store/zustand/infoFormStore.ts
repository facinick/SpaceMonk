
import { createZustandChildrenStore } from './store'

type State = {
    id: number
    name: string
    bio: string
    interests: string[]
    profilePictureUrl: string
    headerImageUrl: string
    age: number
    city: string
}

type Actions = {
    setName: (name: string) => void
    setBio: (bio: string) => void
    setInterests: (interests: string[]) => void
    setProfilePictureUrl: (profilePictureUrl: string) => void
    setHeaderImageUrl: (headerImageUrl: string) => void
    setAge: (age: number) => void
    setCity: (city: string) => void
    reset: () => void
}

type InfoFormStore = State & Actions

const initialState: State = {
    id: -1,
    name: "",
    bio: "",
    interests: [],
    profilePictureUrl: "",
    headerImageUrl: "",
    age: -1,
    city: "",
}

const useInfoFormStore = createZustandChildrenStore<InfoFormStore>()(

    (set, get) => ({
        ...initialState,
        setName: (name: string) => {
            set({ name })
        },
        setBio: (bio: string) => {
            set({ bio })
        },
        setInterests: (interests: string[]) => {
            set({ interests })
        },
        setProfilePictureUrl: (profilePictureUrl: string) => {
            set({ profilePictureUrl })
        },
        setHeaderImageUrl: (headerImageUrl: string) => {
            set({ headerImageUrl })
        },
        setAge: (age: number) => {
            set({ age })
        },
        setCity: (city: string) => {
            set({ city })
        },
        reset: () => set(initialState),
    })

)

export { InfoFormStore, useInfoFormStore }

