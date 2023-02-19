import { useState } from 'react'
import { isImageValid } from 'src/hooks/useImageValidator'
import { wait } from 'src/utils/typescript'
import { ReloadIcon, ResetThemeIcon } from '../Icons/icons'

interface ComponentProps {
  disable: boolean
  onChange: (newValud: string) => void
  onStart: () => void
  onDone: (url: string) => void
}

const ImageLoaderAndViewer = (props: ComponentProps) => {
  const { disable, onChange: updateOnChange, onStart, onDone } = props

  const [url, setUrl] = useState<string>()

  const [valid, setValid] = useState<boolean>(false)
  const [validating, setValidating] = useState<boolean>(false)

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const url = event.target.value
    setUrl(url)
    updateOnChange(url)
  }

  const validate = async (): Promise<boolean> => {
    setValidating(true)
    wait({ seconds: 0.1 })
    const isValid = await isImageValid(url)
    setValidating(false)
    wait({ seconds: 0.1 })
    if (!isValid) {
      setValid(false)
      wait({ seconds: 0.1 })
      return false
    }
    setValid(true)
    wait({ seconds: 0.1 })
    return true
  }

  return (
    <div className="input-group w-full">
      <input
        disabled={disableInputs}
        onChange={onHeaderImageUrlChange}
        value={headerImageUrl}
        type="text"
        placeholder="Image url"
        className="input-bordered input w-full"
      />
      <button onClick={loadRandomHeaderImage} className="btn-square btn">
        <ReloadIcon />
      </button>
      <button onClick={loadRandomHeaderImage} className="btn-square btn">
        <ResetThemeIcon />
      </button>
    </div>
  )
}

export default ImageLoaderAndViewer
