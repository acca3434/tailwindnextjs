import './radio.css'

const RadioGroup: React.FC<RadioGroupProps> = ({ value, label }) => {
    return (
        <fieldset>
            <label>
                <input type="radio" name="contact" value={value} />
                <span>{label}</span>
            </label>
        </fieldset>
    )
}

export default RadioGroup
