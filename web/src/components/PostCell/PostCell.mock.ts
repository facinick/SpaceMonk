import { Post } from 'types/graphql'

export const singlePost: Post = {
  id: 0,
  body: 'body of post two',
  createdAt: '2023-02-10T19:13:19.020Z',
  title: 'title two',
  updatedAt: '2023-02-10T19:13:19.020Z',
}

export const singlePostBig: Post = {
  id: 2,
  body: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
  createdAt: '2023-02-10T19:13:19.020Z',
  title:
    'this is a long title that goes on forever and never cease to stop, in hopes of catching some bugs related to long texts on short screens, how about that my friend?',
  updatedAt: '2023-02-10T19:13:19.020Z',
}

export const singlePostBigNoGap: Post = {
  id: 3,
  body: `thisisalongtitlethatgoesonforeverandneverceasetostop,inhopesofcatchingsomebugsrelatedtolongtextsonshortscreens,howaboutthatmyfriend?thisisalongtitlethatgoesonforeverandneverceasetostop,inhopesofcatchingsomebugsrelatedtolongtextsonshortscreens,howaboutthatmyfriend?thisisalongtitlethatgoesonforeverandneverceasetostop,inhopesofcatchingsomebugsrelatedtolongtextsonshortscreens,howaboutthatmyfriend?thisisalongtitlethatgoesonforeverandneverceasetostop,inhopesofcatchingsomebugsrelatedtolongtextsonshortscreens,howaboutthatmyfriend?thisisalongtitlethatgoesonforeverandneverceasetostop,inhopesofcatchingsomebugsrelatedtolongtextsonshortscreens,howaboutthatmyfriend?thisisalongtitlethatgoesonforeverandneverceasetostop,inhopesofcatchingsomebugsrelatedtolongtextsonshortscreens,howaboutthatmyfriend?`,
  createdAt: '2023-01-10T19:13:19.020Z',
  title:
    'thisisalongtitlethatgoesonforeverandneverceasetostop,inhopesofcatchingsomebugsrelatedtolongtextsonshortscreens,howaboutthatmyfriend?',
  updatedAt: '2023-02-10T19:13:19.020Z',
}
