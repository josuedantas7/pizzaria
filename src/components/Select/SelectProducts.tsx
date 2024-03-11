import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SelectProductProps } from "@/@types/SelectProductProps"

export function SelectProduct({product,placeholder,products,setProduct} : SelectProductProps) {
  return (
    <Select value={product} onValueChange={setProduct}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {products.map((product) => (
            product.id && (
                <SelectItem key={product.id} value={product.id}>
                    <SelectLabel>{product.name}</SelectLabel>
                </SelectItem>
            )
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
