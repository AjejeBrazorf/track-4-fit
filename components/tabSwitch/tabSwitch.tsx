'use client'

import clsx from 'clsx'
import type { CSSProperties, ReactNode } from 'react'
import React, { useMemo } from 'react'

import classes from './tabSwitch.module.scss'

interface TabSwitchProps<T> {
  'data-testid'?: string
  inverted?: boolean
  onChange: (value: T) => void
  options: { label: ReactNode; value: T; tabView: ReactNode }[]
  value: T
  variant: 'primary' | 'font' | 'primaryDark'
}

export const TabSwitch = <T extends string>({
  'data-testid': dataTestId = 'radio-switch',
  inverted = false,
  onChange,
  options,
  value,
  variant,
}: TabSwitchProps<T>) => {
  const activeIndex = useMemo(() => {
    return options.findIndex((option) => option.value === value)
  }, [options, value])
  const switchStyle = { '--options-length': options.length } as CSSProperties
  const slidingPanelStyle = {
    '--selection': activeIndex.toString(),
  } as CSSProperties
  return (
    <div>
      <div
        className={clsx(classes.switch, {
          [classes.primary]: variant === 'primary',
          [classes.primaryDark]: variant === 'primaryDark',
          [classes.font]: variant === 'font',
          [classes.inverted]: inverted,
        })}
        data-testid={dataTestId}
        style={switchStyle}>
        <div className={classes.optionsContainer}>
          {options.map(({ label, value: optionValue }) => {
            return (
              <button
                type='button'
                data-testid={`${dataTestId}-item-${optionValue}`}
                onClick={() => {
                  onChange(optionValue)
                }}
                key={optionValue}>
                {label}
              </button>
            )
          })}
          <div className={classes.selection} style={slidingPanelStyle} />
        </div>
      </div>
      <div className={classes.view}>{options[activeIndex].tabView}</div>
    </div>
  )
}
