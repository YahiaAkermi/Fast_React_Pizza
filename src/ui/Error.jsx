import { useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

function Error() {
  const error = useRouteError();

  return (
    <div>
      <h1 className="text-base md:text-xl lg:text-2xl font-bold text-stone-900">
        Something went wrong 😢
      </h1>
      <p className="text-stone-500">{error.data || error.message}</p>
      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default Error;
