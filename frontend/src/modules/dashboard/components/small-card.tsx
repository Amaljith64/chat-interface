import { Card, CardBody, CardTitle } from '@/modules/common/card'
import React from 'react'


interface SmallCardProps {
  title: string;
  children?: React.ReactNode;
  className?: string;
}

const SmallCard = ({title,children, className}:SmallCardProps) => {
  return (
    <Card className={className}>
        <CardTitle>
        {title}
        </CardTitle>
        <CardBody>
        {children}
        </CardBody>

    </Card>
  )
}

export default SmallCard