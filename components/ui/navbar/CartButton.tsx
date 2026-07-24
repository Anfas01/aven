"use client";


import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { usePathname } from "next/navigation";


interface Props {
  totalItems:number;
}


export default function CartButton({
  totalItems
}:Props){


const pathname = usePathname();


const active = pathname === "/cart";


return (

<>
{/* Desktop */}

<Link
href="/cart"
className={`
hidden sm:flex items-center gap-2
rounded-full border px-5 py-2
text-sm font-medium transition

${
active
?
"bg-zinc-900 text-white border-zinc-900"
:
"border-zinc-200 hover:bg-zinc-900 hover:text-white"
}
`}
>

<ShoppingBag size={16}/>

Cart

<span
className={`
rounded-full px-2 py-0.5 text-xs

${
active
?
"bg-white/20"
:
"bg-zinc-100 text-zinc-600"
}

`}
>
{totalItems}
</span>

</Link>



{/* Mobile */}

<Link
href="/cart"
className={`
relative rounded-full border p-2 sm:hidden

${
active
?
"bg-zinc-900 text-white"
:
"border-zinc-200"
}
`}
>

<ShoppingBag size={18}/>


{
totalItems > 0 &&
(
<span
className="
absolute -right-1 -top-1
flex h-5 min-w-5 items-center justify-center
rounded-full bg-red-500
text-[10px] font-bold text-white
"
>
{totalItems}
</span>
)
}


</Link>

</>

)

}