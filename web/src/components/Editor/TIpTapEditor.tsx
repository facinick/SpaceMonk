import React, { useEffect, useRef, useState } from 'react'
import { EditorProps } from './interface'
import { Editor, EditorContent, useEditor } from '@tiptap/react'
import { TwitterPicker } from 'react-color';
import { useOnClickOutside } from 'src/hooks/useOnClickOutside'
import Color from '@tiptap/extension-color'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Paragraph from '@tiptap/extension-paragraph'
import Document from '@tiptap/extension-document'
import Text from '@tiptap/extension-text'
import './TipTapEditor.css'
import CodeBlock from '@tiptap/extension-code-block';
import Code from '@tiptap/extension-code';
import Image from '@tiptap/extension-image';
import { isImageValid } from 'src/hooks/useImageValidator';

const MenuBar = ({ editor }: { editor: Editor }) => {

  if (!editor) {
    return null
  }

  const [showColourPicker, setShowColourPicker] = useState<boolean>(false)
  const colourPickerRef = useRef<TwitterPicker>(null)

  return (
    <div className='flex gap-2 flex-wrap'>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`rounded btn-xs ${ !editor.can().chain().focus().toggleBold().run() ? "btn-disabled" : ""} ${editor.isActive('bold') ? 'btn-accent' : 'btn-ghost'}`}
      >
        bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`rounded btn-xs ${!editor.can().chain().focus().toggleItalic().run() ? "btn-disabled" : ""} ${editor.isActive('italic') ? 'btn-accent' : 'btn-ghost'}`}
      >
        italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`rounded btn-xs ${!editor.can().chain().focus().toggleStrike().run() ? "btn-disabled" : ""} ${editor.isActive('strike') ? 'btn-accent' : 'btn-ghost'}`}
      >
        strike
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        disabled={!editor.can().chain().focus().setTextAlign('left').run()}
        className={`rounded btn-xs ${!editor.can().chain().focus().setTextAlign('left').run() ? "btn-disabled" : ""} ${editor.isActive({ textAlign: 'left' }) ? 'btn-accent' : 'btn-ghost'}`}
      >
        left
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        disabled={!editor.can().chain().focus().setTextAlign('center').run()}
        className={`rounded btn-xs ${!editor.can().chain().focus().setTextAlign('center').run() ? "btn-disabled" : ""} ${editor.isActive({ textAlign: 'center' }) ? 'btn-accent' : 'btn-ghost'}`}
      >
        center
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        disabled={!editor.can().chain().focus().setTextAlign('right').run()}
        className={`rounded btn-xs ${!editor.can().chain().focus().setTextAlign('right').run() ? "btn-disabled" : ""} ${editor.isActive({ textAlign: 'right' }) ? 'btn-accent' : 'btn-ghost'}`}
      >
        right
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        disabled={!editor.can().chain().focus().setTextAlign('justify').run()}
        className={`rounded btn-xs ${!editor.can().chain().focus().setTextAlign('justify').run() ? "btn-disabled" : ""} ${editor.isActive({ textAlign: 'justify' }) ? 'btn-accent' : 'btn-ghost'}`}
      >
        justify
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={`rounded btn-xs ${!editor.can().chain().focus().toggleCode().run() ? "btn-disabled" : ""} ${editor.isActive('code') ? 'btn-accent' : 'btn-ghost'}`}
      >
        code
      </button>
      <button
        className={`btn-ghost rounded btn-xs`}
        onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        clear marks
      </button>
      <button
        className={`btn-ghost rounded btn-xs`}
        onClick={() => editor.chain().focus().clearNodes().run()}>
        clear nodes
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={`rounded btn-xs ${editor.isActive('paragraph') ? 'btn-accent' : 'btn-ghost'}`}
      >
        paragraph
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`rounded btn-xs ${editor.isActive('heading', { level: 1 }) ? 'btn-accent' : 'btn-ghost'}`}
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`rounded btn-xs ${editor.isActive('heading', { level: 2 }) ? 'btn-accent' : 'btn-ghost'}`}
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`rounded btn-xs ${editor.isActive('heading', { level: 3 }) ? 'btn-accent' : 'btn-ghost'}`}
      >
        h3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={`rounded btn-xs ${editor.isActive('heading', { level: 4 }) ? 'btn-accent' : 'btn-ghost'}`}
      >
        h4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={`rounded btn-xs ${editor.isActive('heading', { level: 5 }) ? 'btn-accent' : 'btn-ghost'}`}
      >
        h5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={`rounded btn-xs ${editor.isActive('heading', { level: 6 }) ? 'btn-accent' : 'btn-ghost'}`}
      >
        h6
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`rounded btn-xs ${editor.isActive('bulletList') ? 'btn-accent' : 'btn-ghost'}`}
      >
        bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`rounded btn-xs ${editor.isActive('orderedList') ? 'btn-accent' : 'btn-ghost'}`}
      >
        ordered list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`rounded btn-xs ${editor.isActive('codeBlock') ? 'btn-accent' : 'btn-ghost'}`}
      >
        code block
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`rounded btn-xs ${editor.isActive('blockquote') ? 'btn-accent' : 'btn-ghost'}`}
      >
        blockquote
      </button>
      <button
        className={`btn-ghost rounded btn-xs`}
        onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        horizontal rule
      </button>
      <button
        className={`btn-ghost rounded btn-xs`}
        onClick={() => editor.chain().focus().setHardBreak().run()}>
        hard break
      </button>
      <button
        className={`btn-ghost rounded btn-xs ${!editor.can().chain().focus().undo().run() ? "btn-disabled" : ""}`}
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        undo
      </button>
      <button
        className={`btn-ghost rounded btn-xs ${!editor.can().chain().focus().redo().run() ? "btn-disabled" : ""}`}
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        redo
      </button>
      <button
        style={{
          color: editor.getAttributes('textStyle').color || "inherit"
        }}
        className={`rounded btn-xs ${editor.isActive('textStyle') ? 'btn-accent' : 'btn-ghost'}`}
        onClick={() => setShowColourPicker((showing) => !showing)}
      >
        text colour
      </button>
      <button className={`btn-ghost rounded btn-xs`} onClick={() => editor.chain().focus().unsetColor().run()}>
        remove text colour
      </button>
      {showColourPicker &&
        <TwitterPicker
        ref={colourPickerRef}
        color={editor.getAttributes('textStyle').color}
        onChangeComplete={(color) => {
          editor.chain().setColor(color.hex).run()
          }}
        />
      }
      <button
        className={`btn-ghost rounded btn-xs`}
        onClick={async () => {
          let imageUrl = prompt("Enter image url")
          while (imageUrl !== null) {
            const isValid = await isImageValid(imageUrl)
            if (isValid) {
              editor.chain().setImage({ src: imageUrl }).run()
              break
            } else {
              imageUrl = prompt("Enter valid image url")
            }
          }
        }}
      >
        add image
      </button>
    </ div>
  )
}

const TipTapEditor = React.forwardRef<Editor, EditorProps>((props, ref) => {

  const editorRef = useRef(null);
  const { value, initialValue, onEditorChange, disable } = props

  const editor = useEditor({
    extensions: [
      StarterKit,
      Document,
      Paragraph,
      Text,
      TextStyle,
      Placeholder.configure({
        placeholder: 'Write something … Nice.',
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
        HTMLAttributes: {
          class: 'my-custom-class',
        },
      })
    ],
    content: initialValue,
    onUpdate: (({ editor }) => {
      onEditorChange(editor.getHTML())
    }),
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl h-full w-full',
      },
    }
  })

  return (
    <div className='flex flex-wrap justify-center gap-5'>
      <MenuBar editor={editor} />
      <EditorContent className='textarea textarea-bordered override-tiptap-editor-style w-full min-h-24' disabled={disable} ref={editorRef} value={value} editor={editor} />
    </div>
  )

})

export { TipTapEditor }
