import { createZustandChildrenStore } from './store'

/*******************************************************
 *                             ->  B:error[server]      *
 *            exists           ->  C:loaded             *
 * A:loading -> does't exist   ->  D:not_found          *
 *            error            ->  E:error[client]      *
 *                                                      *
 *                                                      *
 *******************************************************/

export type PostPageState =
  | 'loading'
  | 'not_found'
  | 'error_client'
  | 'loaded'
  | 'error_server'

type State = {
  state: PostPageState
  post: {
    state: PostPageState
  }
  comments: {
    state: PostPageState
  }
}

type Actions = {
  reset: () => void
  setState: (state: PostPageState) => void
  setPostState: (state: PostPageState) => void
  setCommentsState: (state: PostPageState) => void
}

type PostPageStore = State & Actions

const initialState: State = {
  state: 'loading',
  post: {
    state: 'loading',
  },
  comments: {
    state: 'loading',
  },
}

const usePostPageStore = createZustandChildrenStore<PostPageStore>()(
  (set, get) => ({
    ...initialState,
    setState: (state: PostPageState) => {
      set({ state })
    },
    setPostState: (state: PostPageState) => {
      const post = get().post
      post.state = state
      set({ post })
    },
    setCommentsState: (state: PostPageState) => {
      const comments = get().comments
      comments.state = state
      set({ comments })
    },
    reset: () => set(initialState),
  })
)

export { usePostPageStore, PostPageStore }
