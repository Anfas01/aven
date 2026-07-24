"use client";


import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "./navLinks";


interface Props{
 open:boolean;
 close:()=>void;
}



export default function MobileMenu({
open,
close
}:Props){


const pathname = usePathname();


const active=(href:string)=>
href === "/"
?
pathname === "/"
:
pathname.startsWith(href);



return (

<div
className={`
overflow-hidden border-t border-zinc-200
transition-all lg:hidden

${
open
?
"max-h-96 opacity-100"
:
"max-h-0 opacity-0"
}
`}
>

<nav className="flex flex-col gap-1 p-4">


{
[
...navLinks,
{
name:"Account",
href:"/account"
}

].map(link=>(


<Link
key={link.href}
href={link.href}
onClick={close}

className={`
rounded-xl px-4 py-3 text-sm font-medium

${
active(link.href)
?
"bg-zinc-900 text-white"
:
"hover:bg-zinc-100"
}

`}
>

{link.name}

</Link>


))
}



</nav>


</div>

)

}