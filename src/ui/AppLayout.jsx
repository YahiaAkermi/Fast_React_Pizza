import Header from "./Header";
import CartOverView from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";

function AppLayout() {
  const navigation = useNavigation();

  const isLoading = navigation.state === "loading";

  return (
    <div className="grid grid-rows-[auto_1fr_auto] h-screen ">
      <Header />
      {isLoading && (
        <div className="backdrop-blur-sm bg-white/30 absolute inset-0 z-10 h-screen w-full">
          <Loader />
        </div>
      )}

      <div className="overflow-y-scroll w-full">
        <main className={`max-w-3xl mx-auto  `}>
          <Outlet />
        </main>
      </div>
      <CartOverView />
    </div>
  );
}

export default AppLayout;
