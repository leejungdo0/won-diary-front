import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/section-cards";

import data from "./data.json";
import { DataTable } from "@/components/ui/data-table";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      <div className="px-4 lg:px-6">
        <DataTable
          data={data}
          columns={[
            {
              accessorKey: "id",
              header: "ID",
            },
            {
              accessorKey: "header",
              header: "header",
            },
            {
              accessorKey: "type",
              header: "type",
            },
            {
              accessorKey: "status",
              header: "status",
            },
            {
              accessorKey: "limit",
              header: "limit",
            },
            {
              accessorKey: "reviewer",
              header: "reviewer",
            },
          ]}
        />
      </div>
    </div>
  );
}
