import { IFormInput } from "../../interfaces/IFormInput";


export function Input(props: IFormInput) {
  return (
      <input {...props} className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500' />
  )
}