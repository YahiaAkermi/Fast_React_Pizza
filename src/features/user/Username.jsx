import { useSelector } from "react-redux";

function Username() {
  const username = useSelector((store) => store.user.username);

  if (!username) return null;

  return <p className="text-sm font-semibold max-sm:hidden ">{username}</p>;
}

export default Username;
