import React, {useState} from 'react';
import { EmailInput, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';


export const TextInput = props => {
    const { type, name, placeholder, icon, onIconClick} = props
    const [value, setValue] = useState('')
    const inputRef = React.useRef(null)

    return (
      <Input
        type={type}
        placeholder={placeholder}
        icon={icon}
        onChange={e => setValue(e.target.value)}
        value={value}
        onIconClick={onIconClick}
        name={name}
        error={false}
        ref={inputRef}
        errorText={'Ошибка'}
        size={'default'}
      />
    )
}

export const EmailInputWrap = () => {
    const [value, setValue] = useState('')
    const onChange = e => {
      setValue(e.target.value)
    }
    return <EmailInput onChange={onChange} value={value} name={'email'} />
}

export const PasswordInputWrap = () => {
    const [value, setValue] = useState('')
    const onChange = e => {
      setValue(e.target.value)
    }
    return <PasswordInput onChange={onChange} value={value} name={'password'} />
} 

