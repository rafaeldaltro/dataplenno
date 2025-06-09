import * as React from "react"
import { cn } from "@/lib/utils"

interface CodeProps extends React.HTMLAttributes<HTMLPreElement> {}

const Code = React.forwardRef<HTMLPreElement, CodeProps>(({ className, ...props }, ref) => {
  return (
    <pre
      ref={ref}
      className={cn("mb-4 mt-2 overflow-x-auto rounded-lg bg-muted px-4 py-3 font-mono text-sm", className)}
      {...props}
    />
  )
})
Code.displayName = "Code"

export { Code }
