import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className=" py-2 ">
      <div className="flex justify-between items-center">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>

        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="text-sm text-stone-500 italic capitalize">
        {isLoadingIngredients ? "loading..." : ingredients?.join(" ,")}
      </p>
    </li>
  );
}

export default OrderItem;
