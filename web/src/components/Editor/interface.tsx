export type EditorProps = {
  onEditorChange: ({ newHtmlValue, newPlainTextValue }: { newHtmlValue: string, newPlainTextValue: string }) => void
  initialValue: string
  value: string
  disable: boolean
}
