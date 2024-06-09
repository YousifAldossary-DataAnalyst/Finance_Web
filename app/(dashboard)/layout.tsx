import React from "react";

type Props = { children: React.ReactNode };

const Dashboardslayout = ({ children }: Props) => {
  return (
    <>
        <main className="px-3 lg:px-14">{children}</main>
    </>
  );
};

export default Dashboardslayout;
