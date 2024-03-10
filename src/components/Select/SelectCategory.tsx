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
import { SelectCategoryProps } from "@/@types/SelectCategoryProps"

export function SelectCategory({category,placeholder,categories,setCategory} : SelectCategoryProps) {
  return (
    <Select value={category} onValueChange={setCategory}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              <SelectLabel>{category.name}</SelectLabel>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
