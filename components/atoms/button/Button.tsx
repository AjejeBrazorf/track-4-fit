import type { ReactNode } from 'react'
import React from 'react'

import style from './button.module.scss'

export interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * Button contents
   */
  children: ReactNode
  /**
   * Optional click handler
   */
  onClick?: () => void
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  primary = false,
  size = 'medium',
  children,
  ...props
}: ButtonProps) => {
  const mode = primary ? style.storybookButton : style.storybookButton
  return (
    <button
      type='button'
      className={[style.storybookButton, size === 'small' && mode].join(' ')}
      {...props}>
      {children}
    </button>
  )
}
