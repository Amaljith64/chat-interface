import { cn } from '@/lib/utils';




function CardTitle({ children, className }: React.ComponentProps<"div">) {
  return (
    <div className={`capitalize font-medium font-darker text-3xl md:text-4xl mb-8 ${className}`}>
      {children}
    </div>
  )
}


function CardBody({ children, className }: React.ComponentProps<"div">) {
  return (
    <div className={`${className}`}>
      {children}
    </div>
  )
}


function Card({ className, ...props }: React.ComponentProps<"div">) {
    return (
      <div
        data-slot="card"
        className={cn(
          "bg-white  px-4 md:px-8 py-6 md:py-8 gap-6 border rounded-3xl border-border",
          className
        )}
        {...props}
      />
    )
  }


export {Card , CardBody, CardTitle};