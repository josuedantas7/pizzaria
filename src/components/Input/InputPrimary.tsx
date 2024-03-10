// types
import { InputPrimaryProps } from "@/@types/InputPrimaryProps"

// component
import { Input } from "@/components/ui/input"

export function InputPrimary({value,type,placeholder,onChange} : InputPrimaryProps) {
    return <Input value={value} onChange={(e) => onChange(e.target.value)} type={type} placeholder={placeholder} />
}
