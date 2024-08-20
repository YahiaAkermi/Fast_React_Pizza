import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";

function Home() {
  const username = useSelector((store) => store.user.username);

  return (
    <div className="my-10 text-center max-md:px-2">
      <h1 className="text-xl md:text-3xl text-center font-semibold text-stone-700 mb-8">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>

      {username ? (
        <Button to="/menu" type="primary">
          Continue ordering, {username}{" "}
        </Button>
      ) : (
        <CreateUser />
      )}
    </div>
  );
}

export default Home;
