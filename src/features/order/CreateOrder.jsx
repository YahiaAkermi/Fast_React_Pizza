import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import store from "../../Store";
import { useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress, getUserAddress } from "../user/userSlice";
import { getAddress } from "../../services/apiGeocoding";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const {
    username,
    status: positionStatus,
    position,
    address: userAddress,
    error: errorAddress,
  } = useSelector((store) => store.user);

  const isLoadingPosition = positionStatus === "loading";

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formErrors = useActionData();
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);

  const totalCartPrice = useSelector(getTotalCartPrice);
  const dispatch = useDispatch();

  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;

  const totalPriceToPay = totalCartPrice + priorityPrice;

  return (
    <div className="px-4 py-6">
      <h2 className="text-xl mb-8 font-bold ">
        Ready to order? let&apos;s go!
      </h2>

      <Form method="POST">
        <div className="mb-5  flex flex-col gap-2 sm:flex-row  sm:items-center ">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            required
            className="input grow"
            defaultValue={username}
          />
        </div>

        <div className="mb-5  flex flex-col gap-2 sm:flex-row  sm:items-center ">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full" />
            {formErrors?.phone && (
              <p className="text-sm text-red-500 px-3 mt-2">
                {formErrors?.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5  flex flex-col gap-2 sm:flex-row  sm:items-center ">
          <label className="sm:basis-40">Address</label>
          <div className="grow relative">
            <input
              type="text"
              name="address"
              required
              className="input w-full"
              defaultValue={userAddress}
              disabled={isLoadingPosition}
            />
            {!position.longitude && !position.latitude && (
              <Button
                disabled={isLoadingPosition}
                type="attached"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get position
              </Button>
            )}
            {errorAddress && (
              <p className="text-sm text-red-500 px-3 mt-2">{errorAddress}</p>
            )}
          </div>
        </div>

        <div className="flex  items-center gap-4 my-2 mb-10">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
            className="h-6 w-6 accent-yellow-500 hover:cursor-pointer focus:ring focus:ring-yellow-400 focus:ring-offset-2"
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={`${position.latitude},${position.longitude}`}
          />
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting || isLoadingPosition
              ? "placing order..."
              : `Order now ${formatCurrency(totalPriceToPay)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  //formData is api from the browser
  const formData = await request.formData();

  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const error = {};

  if (!isValidPhone(data.phone))
    error.phone =
      "please check you phone number we might need it to contact you.";

  if (Object.keys(error).length > 0) return error;

  const newOrder = await createOrder(order);

  //don't overuse it
  store.dispatch(clearCart());

  //now we gonna use redirect to take us to the recently created order
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
