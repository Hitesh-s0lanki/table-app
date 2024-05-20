import { format } from "date-fns";
import { Separator } from "./ui/separator";

const CustomTooltips = ({ active, payload }: any) => {
  if (!active) return null;

  const date = payload[0].payload.date;
  const pending = payload[0].value;
  const inprogress = payload[1].value;
  const complete = payload[2].value;

  return (
    <div className=" rounded-sm bg-white shadow-sm border overflow-hidden">
      <div className=" text-sm p-2 px-3 bg-muted text-muted-foreground">
        {format(date, "MMM dd, yyyy")}
      </div>
      <Separator />
      <div className=" p-2 px-3 space-y-1">
        <div className="flex items-center justify-between gap-x-4">
          <div className=" flex items-center gap-x-2">
            <div className=" size-1.5 bg-blue-500 rounded-full" />
            <p className=" text-sm text-muted-foreground">Pending</p>
          </div>
          <p className=" text-sm text-right font-medium">{pending}</p>
        </div>
      </div>
      <div className=" p-2 px-3 space-y-1">
        <div className="flex items-center justify-between gap-x-4">
          <div className=" flex items-center gap-x-2">
            <div className=" size-1.5 bg-rose-500 rounded-full" />
            <p className=" text-sm text-muted-foreground">Is Active</p>
          </div>
          <p className=" text-sm text-right font-medium">{inprogress}</p>
        </div>
      </div>
      <div className=" p-2 px-3 space-y-1">
        <div className="flex items-center justify-between gap-x-4">
          <div className=" flex items-center gap-x-2">
            <div className=" size-1.5 bg-green-500 rounded-full" />
            <p className=" text-sm text-muted-foreground">Complete</p>
          </div>
          <p className=" text-sm text-right font-medium">{complete}</p>
        </div>
      </div>
    </div>
  );
};

export default CustomTooltips;
