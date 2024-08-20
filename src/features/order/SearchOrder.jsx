import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    //we don't won't the page to be reloaded
    e.preventDefault();

    //checking if there is no search
    if (!searchTerm) return;

    //if there is a search term we gonna navigate to this url
    navigate(`/order/${searchTerm}`);

    //then i set back the search term to empty string again
    setSearchTerm("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter order n°"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="rounded-full py-2 px-4 text-sm focus:outline-none focus:ring bg-yellow-200 focus:ring-yellow-200 focus:ring-offset-1 w-28 placeholder:text-stone-400  sm:w-64
        sm:focus:w-72 transition-all duration-300 focus:ring-opacity-50
        "
      />
    </form>
  );
}

export default SearchOrder;
