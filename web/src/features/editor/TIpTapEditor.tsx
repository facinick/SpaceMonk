import Code from '@tiptap/extension-code'
import CodeBlock from '@tiptap/extension-code-block'
import Color from '@tiptap/extension-color'
import Document from '@tiptap/extension-document'
import Image from '@tiptap/extension-image'
import Paragraph from '@tiptap/extension-paragraph'
import Placeholder from '@tiptap/extension-placeholder'
import Text from '@tiptap/extension-text'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import { Editor, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useRef, useState } from 'react'
import { GithubPicker } from 'react-color'
import { isImageValid } from 'src/hooks/useImageValidator'
import { useOnClickOutside } from 'src/hooks/useOnClickOutside'
import tinycolor from 'tinycolor2'
import './TipTapEditor.css'
import { EditorProps } from './interface'

const MenuBar = ({ editor, disable }: { editor: Editor; disable: boolean }) => {
  if (!editor) {
    return null
  }

  const [showColourPicker, setShowColourPicker] = useState<boolean>(false)
  const colourPickerRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(colourPickerRef, () => {
    setShowColourPicker(false)
  })

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run() || disable}
        className={`btn-xs rounded ${!editor.can().chain().focus().toggleBold().run() ? 'btn-disabled' : ''
          } ${editor.isActive('bold') ? 'btn-accent' : 'btn-ghost'}`}
      >
        bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run() || disable}
        className={`btn-xs rounded ${!editor.can().chain().focus().toggleItalic().run()
            ? 'btn-disabled'
            : ''
          } ${editor.isActive('italic') ? 'btn-accent' : 'btn-ghost'}`}
      >
        italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run() || disable}
        className={`btn-xs rounded ${!editor.can().chain().focus().toggleStrike().run()
            ? 'btn-disabled'
            : ''
          } ${editor.isActive('strike') ? 'btn-accent' : 'btn-ghost'}`}
      >
        strike
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        disabled={
          !editor.can().chain().focus().setTextAlign('left').run() || disable
        }
        className={`btn-xs rounded ${!editor.can().chain().focus().setTextAlign('left').run()
            ? 'btn-disabled'
            : ''
          } ${editor.isActive({ textAlign: 'left' }) ? 'btn-accent' : 'btn-ghost'
          }`}
      >
        left
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        disabled={
          !editor.can().chain().focus().setTextAlign('center').run() || disable
        }
        className={`btn-xs rounded ${!editor.can().chain().focus().setTextAlign('center').run()
            ? 'btn-disabled'
            : ''
          } ${editor.isActive({ textAlign: 'center' }) ? 'btn-accent' : 'btn-ghost'
          }`}
      >
        center
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        disabled={
          !editor.can().chain().focus().setTextAlign('right').run() || disable
        }
        className={`btn-xs rounded ${!editor.can().chain().focus().setTextAlign('right').run()
            ? 'btn-disabled'
            : ''
          } ${editor.isActive({ textAlign: 'right' }) ? 'btn-accent' : 'btn-ghost'
          }`}
      >
        right
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        disabled={
          !editor.can().chain().focus().setTextAlign('justify').run() || disable
        }
        className={`btn-xs rounded ${!editor.can().chain().focus().setTextAlign('justify').run()
            ? 'btn-disabled'
            : ''
          } ${editor.isActive({ textAlign: 'justify' }) ? 'btn-accent' : 'btn-ghost'
          }`}
      >
        justify
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run() || disable}
        className={`btn-xs rounded ${!editor.can().chain().focus().toggleCode().run() ? 'btn-disabled' : ''
          } ${editor.isActive('code') ? 'btn-accent' : 'btn-ghost'}`}
      >
        code
      </button>
      <button
        className={`btn-ghost btn-xs rounded`}
        disabled={disable}
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
      >
        clear marks
      </button>
      <button
        className={`btn-ghost btn-xs rounded`}
        disabled={disable}
        onClick={() => editor.chain().focus().clearNodes().run()}
      >
        clear nodes
      </button>
      <button
        disabled={disable}
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={`btn-xs rounded ${editor.isActive('paragraph') ? 'btn-accent' : 'btn-ghost'
          }`}
      >
        paragraph
      </button>
      <button
        disabled={disable}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`btn-xs rounded ${editor.isActive('heading', { level: 1 }) ? 'btn-accent' : 'btn-ghost'
          }`}
      >
        h1
      </button>
      <button
        disabled={disable}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`btn-xs rounded ${editor.isActive('heading', { level: 2 }) ? 'btn-accent' : 'btn-ghost'
          }`}
      >
        h2
      </button>
      <button
        disabled={disable}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`btn-xs rounded ${editor.isActive('heading', { level: 3 }) ? 'btn-accent' : 'btn-ghost'
          }`}
      >
        h3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={`btn-xs rounded ${editor.isActive('heading', { level: 4 }) ? 'btn-accent' : 'btn-ghost'
          }`}
      >
        h4
      </button>
      <button
        disabled={disable}
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={`btn-xs rounded ${editor.isActive('heading', { level: 5 }) ? 'btn-accent' : 'btn-ghost'
          }`}
      >
        h5
      </button>
      <button
        disabled={disable}
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={`btn-xs rounded ${editor.isActive('heading', { level: 6 }) ? 'btn-accent' : 'btn-ghost'
          }`}
      >
        h6
      </button>
      <button
        disabled={disable}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`btn-xs rounded ${editor.isActive('bulletList') ? 'btn-accent' : 'btn-ghost'
          }`}
      >
        bullet list
      </button>
      <button
        disabled={disable}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`btn-xs rounded ${editor.isActive('orderedList') ? 'btn-accent' : 'btn-ghost'
          }`}
      >
        ordered list
      </button>
      <button
        disabled={disable}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`btn-xs rounded ${editor.isActive('codeBlock') ? 'btn-accent' : 'btn-ghost'
          }`}
      >
        code block
      </button>
      <button
        disabled={disable}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`btn-xs rounded ${editor.isActive('blockquote') ? 'btn-accent' : 'btn-ghost'
          }`}
      >
        blockquote
      </button>
      <button
        disabled={disable}
        className={`btn-ghost btn-xs rounded`}
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        horizontal rule
      </button>
      <button
        disabled={disable}
        className={`btn-ghost btn-xs rounded`}
        onClick={() => editor.chain().focus().setHardBreak().run()}
      >
        hard break
      </button>
      <button
        className={`btn-ghost btn-xs rounded ${!editor.can().chain().focus().undo().run() ? 'btn-disabled' : ''
          }`}
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run() || disable}
      >
        undo
      </button>
      <button
        className={`btn-ghost btn-xs rounded ${!editor.can().chain().focus().redo().run() ? 'btn-disabled' : ''
          }`}
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run() || disable}
      >
        redo
      </button>

      <div className="" ref={colourPickerRef}>
        <button
          disabled={disable}
          style={{
            color: tinycolor(
              editor.getAttributes('textStyle').color || 'inherit'
            ).isLight()
              ? '#000000'
              : 'inherit',
            backgroundColor: editor.getAttributes('textStyle').color || '',
          }}
          className={`hover:bg-[hsl(var(--bc) / var(--tw-bg-opacity)] btn-ghost btn-xs rounded`}
          onClick={() => setShowColourPicker((showing) => !showing)}
        >
          text colour
        </button>
        <div
          className={`${showColourPicker ? 'absolute z-[1]' : 'hidden'} ${disable ? 'pointer-events-none' : 'pointer-events-auto'
            }}`}
        >
          <GithubPicker
            color={editor.getAttributes('textStyle').color}
            onChangeComplete={(color) => {
              editor.chain().setColor(color.hex).run()
            }}
          />
        </div>
      </div>

      <button
        disabled={disable}
        className={`btn-ghost btn-xs rounded`}
        onClick={() => editor.chain().focus().unsetColor().run()}
      >
        remove text colour
      </button>
      <button
        disabled={disable}
        className={`btn-ghost btn-xs rounded`}
        onClick={async () => {
          let imageUrl = prompt('Enter image url')
          const isValid = await isImageValid(imageUrl)
          if (isValid) {
            editor.chain().setImage({ src: imageUrl }).run()
          } else {
            alert('Image URL you gave was bs, try again!')
          }
        }}
      >
        add image
      </button>
    </div>
  )
}

const TipTapEditor = React.forwardRef<Editor, EditorProps>((props, ref) => {
  const editorRef = useRef(null)
  const { value, initialValue, disable, onEditorChange } = props

  const editor = useEditor({
    extensions: [
      StarterKit,
      Document,
      Paragraph,
      Text,
      TextStyle,
      Placeholder.configure({
        placeholder: 'Write something … rice 🍚',
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      CodeBlock.configure({
        HTMLAttributes: {
          class: 'mockup-code',
        },
      }),
      Code.configure({
        HTMLAttributes: {
          class: 'kbd kbd-sm',
        },
      }),
      Color,
      Image.configure({
        allowBase64: true,
      }),
    ],
    content: initialValue,
    onUpdate: ({ editor }) => {
      onEditorChange({
        newHtmlValue: editor.getHTML(),
        newPlainTextValue: editor.getText(),
      })
    },
    editorProps: {
      attributes: {
        class: `min-h-[150px] ${prose_classes} h-full w-full mx-auto`,
      },
    },
  })

  return (
    <div className="flex flex-wrap justify-center gap-5">
      <MenuBar disable={disable} editor={editor} />
      <EditorContent
        className="override-tiptap-editor-style textarea-bordered textarea w-full"
        disabled={disable}
        ref={editorRef}
        value={value}
        editor={editor}
      />
    </div>
  )
})

export const prose_classes = `prose prose-sm sm:prose md:prose-md lg:prose-lg`
export { TipTapEditor }
