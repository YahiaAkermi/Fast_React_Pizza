import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "../menu/MenuItem";

function Menu() {
  const menu = useLoaderData();

  return (
    <ul className=" py-8 max-md:px-3 divide-y divide-stone-600 ">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export async function loader() {
  const menu = await getMenu();

  //this loader has to return the menu data to the page component "Menu"
  return menu;
}

export default Menu;
