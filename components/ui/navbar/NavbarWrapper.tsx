import getCart from "@/actions/cartActions/getCart";
import Navbar from "./Navbar";


export default async function NavbarWrapper(){

const cart = await getCart();


const count = cart.reduce(
(total,item)=> total + item.quantity,
0
);


return (

<Navbar
cartCount={count}
/>

)

}