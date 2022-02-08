import type { ReactElement } from 'react'

const Button = ({ children }: { children: ReactElement }) => {
  return (
    <button>{ children }</button>
  )
}

export default Button