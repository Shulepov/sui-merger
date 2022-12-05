import React, { Fragment, useState, useEffect } from "react";
import { ConnectButton } from "@suiet/wallet-kit";
import "@suiet/wallet-kit/style.css";


const Header: React.FC<{}> = () => {
  return (
    <>
        <div className="flex justify-end p-4">
          <ConnectButton />
        </div>
    </>
  );
};

export default Header;
