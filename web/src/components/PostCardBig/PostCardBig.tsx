import { useMemo, useRef } from "react"
import ReactHtmlParser from 'react-html-parser';
import * as DOMPurify from 'dompurify';
import "./PostCardBig.css"
import SyntaxHighlighter from 'react-syntax-highlighter';
import { nord } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useSyntaxHighlight } from "src/hooks/useRichTextView";
interface ComponentProps {
  headerImageUrl?: string
  title: string
  body: string
  id: number
  createdAt: string
}

const PostCardBig = (props: ComponentProps) => {

  const { headerImageUrl, title, body, id, createdAt } = props

  const parsedBodyHtml = useSyntaxHighlight(body)

  const contentRef = useRef(null);

  return (
    <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 p-5">
      <div className="relative inline-block w-full">
        <img className="w-full h-[300px] object-cover rounded-t-lg" src={headerImageUrl} alt="post header image" />
        <div className="px-8 bg-[#0000004d] absolute left-0 top-0 w-[100%] h-[100%] flex items-center justify-center">
          <h1 style={{ overflowWrap: "anywhere" }} className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h1>
        </div>
      </div>
      <div className="p-5">
        <div ref={contentRef} style={{ overflowWrap: "anywhere" }} className="mb-3 font-normal text-gray-700 dark:text-gray-400">{parsedBodyHtml}</div>
        <time className="text-gray-700 dark:text-gray-400" dateTime={createdAt}>{new Date(createdAt).toDateString()}</time>
      </div>
    </div>
  )
}

export default PostCardBig
