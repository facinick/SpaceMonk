import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { EditorProps } from './interface';

const PUBLIC_URL = window.location.origin

const RTEditor = React.forwardRef<Editor, EditorProps>((props, ref) => {

  const editorRef = useRef(null);
  const { value, initialValue, onEditorChange, disable } = props

  return (
    <>
      <Editor
        ref={ref}
        tinymceScriptSrc={PUBLIC_URL + '/tinymce/tinymce.min.js'}
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue={initialValue}

        init={{
          height: 500,
          menubar: false,
          skin: "oxide-dark",
          content_css: "dark",
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount', 'image',
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist | ' + 'image',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
        disabled={disable}
        value={value}
        mobile={{
          menubar: true,
          plugins: 'autosave lists autolink',
          toolbar: 'undo bold italic styles'
        }}
        onEditorChange={(newValue, editor) => onEditorChange(newValue)}
      />
    </>
  );
})

export { RTEditor }
