import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartPrice, getTotalPizzaQuantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const totalPrice = useSelector(getTotalCartPrice);

  const totalPizzaQuantity = useSelector(getTotalPizzaQuantity);

  if (totalPizzaQuantity === 0) return null;

  return (
    <div className="bg-stone-800 p-4 text-sm md:text-base flex justify-around items-center">
      <p className="text-stone-300 font-semibold uppercase space-x-4 md:space-x-6">
        <span>{totalPizzaQuantity} pizza</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <Link to="/cart" className="text-stone-300 font-semibold">
        Open Cart &rarr;
      </Link>
    </div>
  );
}

export default CartOverview;
