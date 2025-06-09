import * as React from "react"
import { cn } from "@/lib/utils"

interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function Steps({ children, className, ...props }: StepsProps) {
  const childrenArray = React.Children.toArray(children)
  const steps = childrenArray.map((step, index) => {
    if (React.isValidElement(step)) {
      return React.cloneElement(step, {
        stepNumber: index + 1,
        totalSteps: childrenArray.length,
      })
    }
    return step
  })

  return (
    <div className={cn("space-y-8", className)} {...props}>
      {steps}
    </div>
  )
}

interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  stepNumber?: number
  totalSteps?: number
}

export function Step({ title, stepNumber, totalSteps, children, className, ...props }: StepProps) {
  return (
    <div className={cn("relative", className)} {...props}>
      <div className="flex items-center gap-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-background text-sm font-medium">
          {stepNumber}
        </div>
        <h3 className="font-medium">{title}</h3>
      </div>
      <div className="ml-12 mt-3">{children}</div>
      {stepNumber !== totalSteps && (
        <div className="absolute left-4 top-8 h-[calc(100%-16px)] w-px bg-border" aria-hidden="true" />
      )}
    </div>
  )
}
