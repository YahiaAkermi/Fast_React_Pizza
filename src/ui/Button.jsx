import { Link, useNavigate } from "react-router-dom";

function Button({ children, disabled = false, to, type, onClick }) {
  const base =
    " bg-yellow-500 hover:bg-yellow-400 transition-colors duration-500 text-stone-100 rounded-full font-semibold tracking-wider focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-1 disabled:cursor-not-allowed";

  const styles = {
    primary: base + " py-3 px-4",
    small: base + " py-2 px-4 text-sm",
    attached:
      base +
      " py-2 px-4 text-sm absolute top-[3px] right-[3px]  md:right-[5px] md:top-[7px]",
    round: base + " py-1 px-2.5 text-sm ",
    secondary:
      " border-2 border-stone-300 py-2 px-4 hover:bg-stone-200 transition-colors duration-500 text-stone-800 rounded-full font-semibold tracking-wider focus:bg-stone-200 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-1 disabled:cursor-not-allowed",
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button onClick={onClick} disabled={disabled} className={styles[type]}>
        {children}
      </button>
    );

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
