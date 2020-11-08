import React, { ReactNode, useRef, useState } from 'react'
import { Button } from './Button'
import './FileInput.scss'

interface Props {
  icon?: ReactNode
  label: string
  onChange: (file: FileList | null) => void
}

export function FileInput({ icon, label, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [filename, setFilename] = useState('')

  function handleButtonClick() {
    if (inputRef.current === null) return
    inputRef.current.click()
  }

  function handleInputChange() {
    if (inputRef.current === null) return
    onChange(inputRef.current.files)
    const files = inputRef.current.files
    setFilename(
      files === null ? '' : [...files].map((file) => file.name).join(', ')
    )
  }

  return (
    <div className="file-input">
      <input
        className="file-input__input"
        type="file"
        ref={inputRef}
        onChange={handleInputChange}
      />

      <Button className="file-input__button" onClick={handleButtonClick}>
        <span className="file-input__button-icon">{icon}</span>
        <span className="file-input__button-label">{label}</span>
      </Button>

      {filename !== '' ? (
        <div className="file-input__filename">
          <strong>Ausgewählte Datei:</strong>
          <br />
          {filename}
        </div>
      ) : null}
    </div>
  )
}
