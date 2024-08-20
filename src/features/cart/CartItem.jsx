import { formatCurrency } from "../../utils/helpers";

import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="py-3 sm:flex sm:justify-between sm:items-center ">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex justify-between items-center sm:gap-4">
        <UpdateItemQuantity pizzaId={pizzaId} currentQuantity={quantity} />
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <DeleteItem id={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
