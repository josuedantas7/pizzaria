// types
import { InputPrimaryProps } from "@/@types/InputPrimaryProps"

// component
import { Input } from "@/components/ui/input"

export function InputPrimary({type,placeholder,onChange} : InputPrimaryProps) {
    return <Input onChange={(e) => onChange(e.target.value)} type={type} placeholder={placeholder} />
}
