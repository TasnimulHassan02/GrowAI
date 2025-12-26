
import { useEffect, useState } from "react";


function RequestBar({ request }) {
  return (
    <div className="bg-white border mb-10 border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden">

      {/* ACCENT */}


      <div className="p-5 flex flex-col border-4 border-primary rounded-2xl lg:flex-row lg:items-center lg:justify-between gap-6">

        {/* LEFT SIDE: title, description, meta */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900">{request.title}</h3>
          <p className="mt-1 text-gray-600 line-clamp-2 max-w-3xl">{request.description}</p>

          {/* META */}
          <div className="mt-3 flex flex-wrap gap-4 text-gray-600">
            <Meta label="Type" value={request.data_type} />
            <Meta label="Quantity" value={request.quantity} />
            <Meta label="Format" value={request.format || "Any"} />
            <Meta
              label="Deadline"
              value={request.deadline ? new Date(request.deadline).toLocaleDateString() : "Flexible"}
            />
          </div>
        </div>

        {/* RIGHT SIDE: budget, status, button */}
        <div className="flex items-center gap-6 shrink-0">
          <div className="text-right">
            <p className=" text-gray-500">Budget</p>
            <p className="text-2xl font-extrabold text-green-600">${request.budget}</p>
          </div>

          <span className="px-4 py-2 text-sm font-bold rounded-4xl bg-blue-400 text-white capitalize">
            {request.status}
          </span>

          <button className="px-5 py-2 cursor-pointer text-sm font-semibold rounded-xl border border-green-500 text-green-600 hover:bg-green-50 transition">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
/* META ITEM */
function Meta({ label, value }) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-gray-500">{label}:</span>
      <span className="font-semibold capitalize text-gray-800">{value}</span>
    </div>
  );
}
export default RequestBar;