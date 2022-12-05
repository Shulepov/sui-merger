import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = (props: any) => {
  return (
    <div className="flex flex-col dark:bg-slate-800  min-h-screen">
      <Header/>
      <div className="">
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="px-4  sm:px-0">{props.children}</div>
          </div>
        </main>
      </div>
      <div className="grow"></div>
      <Footer/>
      
    </div>
  );
};

export default Layout;
