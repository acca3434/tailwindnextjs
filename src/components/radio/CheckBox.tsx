import './checkbox.css'
import React from 'react'
const CheckBox: React.FC = () => {
    return (
        <div className="checks small">
            <input type="checkbox" id="ex_rd2" name="ex_rds" />
            <label htmlFor="ex_rd2">로그인 저장</label>
        </div>
    )
}

export default CheckBox
