import React from 'react';
import { EmailInput, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';


export const TextInput = ({ type, name}) => {
    const [value, setValue] = React.useState('value')
    const inputRef = React.useRef(null)
    const onIconClick = () => {
      setTimeout(() => inputRef.current.focus(), 0)
      alert('Icon Click Callback')
    }
    return (
      <Input
        type={type}
        placeholder={'placeholder'}
        onChange={e => setValue(e.target.value)}
        icon={'CurrencyIcon'}
        value={value}
        name={name}
        error={false}
        ref={inputRef}
        onIconClick={onIconClick}
        errorText={'Ошибка'}
        size={'default'}
      />
    )
}

export const Emailnput = () => {
    const [value, setValue] = React.useState('bob@example.com')
    const onChange = e => {
      setValue(e.target.value)
    }
    return <EmailInput onChange={onChange} value={value} name={'email'} />
}

export const PasswordInputWrap = () => {
    const [value, setValue] = React.useState('password')
    const onChange = e => {
      setValue(e.target.value)
    }
    return <PasswordInput onChange={onChange} value={value} name={'password'} />
} 