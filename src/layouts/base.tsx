import type { ReactChild } from 'react'

const Base = ({ children }: { children: ReactChild }) => {
  return (
    <main>
      { children }
    </main>
  )
}

export default Base