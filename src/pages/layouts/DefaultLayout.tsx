import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <>
      <div className="layout-default px-[3%] md:px-0 w-screen h-auto bg-gradient-to-br from-slate-50 to-green-50">
        <main className="text-black px-[1%] md:px-[10%]">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default DefaultLayout;
