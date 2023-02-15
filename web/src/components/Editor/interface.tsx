export type EditorProps = {
  onEditorChange: (newValue: string) => void
  initialValue: string
  value: string
  disable: boolean
}
