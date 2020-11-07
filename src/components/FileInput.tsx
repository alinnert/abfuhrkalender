import React, { useRef } from 'react'
import { Button } from './Button'
import './FileInput.scss'

interface Props {
  label: string
  onChange: (file: File) => void
}

export function FileInput({ label, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleButtonClick() {
    if (inputRef.current === null) return
    inputRef.current.click()
  }

  function handleInputChange() {

  }

  return (
    <div className="file-input">
      <input
        className="file-input__input"
        type="file"
        ref={inputRef}
        onChange={handleInputChange}
      />
      <Button onClick={handleButtonClick}>{label}</Button>
    </div>
  )
}
