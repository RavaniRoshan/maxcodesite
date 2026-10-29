'use client'

import * as React from 'react'
import { motion, type Transition } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface DetachableAccordionItem {
  value: string
  title: string
  content: React.ReactNode
  icon?: React.ReactNode
  disabled?: boolean
}

export interface DetachableAccordionProps {
  items: DetachableAccordionItem[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string | undefined) => void
  className?: string
  itemClassName?: string
  detachGap?: number
  cornerRadius?: number
  spring?: Transition
}

const DEFAULT_SPRING: Transition = {
  type: 'spring',
  mass: 10,
  stiffness: 900,
  damping: 80,
}

export function DetachableAccordion({
  items = [],
  value: controlledValue,
  defaultValue = '',
  onValueChange,
  className,
  itemClassName,
  detachGap = 16,
  cornerRadius = 24,
  spring = DEFAULT_SPRING,
}: DetachableAccordionProps) {
  const [internalValue, setInternalValue] = React.useState<string>(defaultValue)
  const activeValue = controlledValue ?? internalValue

  const handleToggle = React.useCallback(
    (itemValue: string) => {
      const nextValue = activeValue === itemValue ? '' : itemValue
      if (controlledValue === undefined) {
        setInternalValue(nextValue)
      }
      onValueChange?.(nextValue || undefined)
    },
    [activeValue, controlledValue, onValueChange],
  )

  const activeIndex = items.findIndex((item) => item.value === activeValue)

  return (
    <div className={cn('flex w-full flex-col', className)}>
      {items.map((item, index) => {
        const isOpen = activeValue === item.value
        const isFirst = index === 0
        const isLast = index === items.length - 1
        const isNextToOpen = isFirst || index === activeIndex + 1
        const isPrevToOpen = isLast || index === activeIndex - 1
        const defaultMarginTop = !isOpen && !isNextToOpen ? -1 : 0

        return (
          <motion.div
            key={item.value}
            layout
            initial={false}
            transition={spring}
            animate={{
              marginTop: isOpen && !isFirst ? detachGap : defaultMarginTop,
              marginBottom: isOpen && !isLast ? detachGap : 0,
              borderTopLeftRadius: isOpen || isNextToOpen ? cornerRadius : 0,
              borderTopRightRadius: isOpen || isNextToOpen ? cornerRadius : 0,
              borderBottomLeftRadius: isOpen || isPrevToOpen ? cornerRadius : 0,
              borderBottomRightRadius: isOpen || isPrevToOpen ? cornerRadius : 0,
            }}
            className={cn(
              'overflow-hidden rounded-none px-6 py-5 bg-sf-secondary/80 border border-st text-tx transition-colors duration-200',
              isOpen && 'bg-sf border-st-secondary shadow-md',
              item.disabled && 'opacity-50 pointer-events-none',
              itemClassName,
            )}
          >
            <button
              type="button"
              disabled={item.disabled}
              onClick={() => handleToggle(item.value)}
              className={cn(
                'flex w-full cursor-pointer items-center justify-between gap-3 text-left',
                'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/30 rounded-sm',
                'disabled:cursor-not-allowed',
              )}
            >
              <div className="flex items-center gap-3.5">
                {item.icon ? <span className="shrink-0 text-amber-500">{item.icon}</span> : null}
                <span className="text-base sm:text-lg font-medium tracking-tight text-tx leading-snug">{item.title}</span>
              </div>
              <motion.span
                initial={false}
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={spring}
                className="shrink-0 text-tx-secondary"
              >
                <ChevronDown className="size-5" />
              </motion.span>
            </button>

            <motion.div
              initial={false}
              animate={{
                height: isOpen ? 'auto' : 0,
                opacity: isOpen ? 1 : 0,
              }}
              transition={spring}
              className="overflow-hidden"
            >
              <div className="mt-4 text-sm sm:text-base leading-relaxed text-tx-secondary">{item.content}</div>
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}

export default DetachableAccordion
