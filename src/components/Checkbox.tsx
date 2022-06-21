import './Checkbox.scss'

interface Props {
  label: string
  name: string
  checked?: boolean
  onChange?: (checked: boolean) => void
}

export function Checkbox({ label, name, checked = false, onChange }: Props) {
  return (
    <div className="checkbox">
      <label className="checkbox__label">
        <input
          className="checkbox__input"
          type="checkbox"
          name={name}
          id={name}
          checked={checked}
          onChange={() => onChange?.(!checked)}
        />
        <span className="checkbox__label-text">{label}</span>
      </label>
    </div>
  )
}
