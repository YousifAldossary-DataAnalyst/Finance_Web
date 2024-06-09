"use client";

import DataGrid from "@/components/global/data-grid";
import WelcomeMsg from "./_components/welcome_msg";
import DataChart from "@/components/global/data-charts";
import Filters from "@/components/global/filter";


export default function DashboarPage() {

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10">
      <WelcomeMsg />
      <Filters />
      <DataGrid />
      <DataChart />
    </div>
  );
}
