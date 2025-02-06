import { roboto } from "@/lib/font/font";

export default function Sidebar() {
  return (
    <div className="min-w-64 col-span-3 pr-8">
      <div className="shadow-sm bg-white border border-gray-100 p-4 rounded-md">
        <div className="text-center mx-auto gap-y-5">
          <div className="h-24 w-24 rounded-full mx-auto bg-indigo-900">
            avatar
          </div>
          <h6 className={`text-sm font-semibold mt-2 ${roboto.variable}`}>
            Pradeep Kumar
          </h6>
        </div>
      </div>
    </div>
  );
}
