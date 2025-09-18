"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card"
import Image from "next/image"

const CardBottomImageDemo = () => {
  return (
    <Card className="max-w-md pb-0 shadow-lg border border-gray-200 overflow-hidden">
      <CardHeader>
        <CardTitle>Fluid Gradient Flow</CardTitle>
        <CardDescription>
          A vibrant and abstract design featuring flowing gradients and dynamic visual elements.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative w-full h-48">
          <Image
            src="/images/hero/mould-remediation-services.jpg"
            alt="Fluid gradient flow abstract design"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          
            quality={85}
          
            priority
          
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwABmX/9k="
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default CardBottomImageDemo