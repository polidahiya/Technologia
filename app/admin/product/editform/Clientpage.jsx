"use client";
import React, { useState } from "react";
import EnumManager from "./EnumManager";

function Clientpage({ catalog }) {
  const [selected, setselected] = useState("");
  const enumFields = [
    { title: "Device Type", field: "deviceType" },
    { title: "Availability", field: "availability" },
    { title: "Currency", field: "currency" },
    { title: "Display Types", field: "displayTypes" },
    { title: "Camera Cutouts", field: "cameraCutouts" },
    { title: "Screen Protections", field: "screenProtections" },
    { title: "Chipsets", field: "chipsets" },
    { title: "Mobile GPUs", field: "mobileGPUs" },
    { title: "Ram Types", field: "ramTypes" },
    { title: "Storage", field: "storage" },
    { title: "Storage Type", field: "storageType" },
    { title: "Battery Type", field: "batteryType" },
    { title: "OS Types", field: "osTypes" },
    { title: "Fingerprints", field: "Fingerprints" },
    { title: "Usb Connectors", field: "usbConnectors" },
    { title: "Smartphone Awards", field: "smartphoneAwards" },
  ];

  return (
    <div className="p-2 md:p-10">
      <div className="w-full overflow-x-auto sticky top-0 bg-white py-2">
        <div className="flex gap-2 border-b pb-2">
          {enumFields.map(({ title }, i) => {
            const isActive = selected === title;

            return (
              <button
                key={i}
                onClick={() => setselected(title)}
                className={`
            px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap
            transition-all duration-200
            ${
              isActive
                ? "bg-black text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }
          `}
              >
                {title}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-6 mt-5">
        {enumFields.map(
          ({ title, field }, i) =>
            selected == title && (
              <EnumManager
                key={i}
                title={title}
                field={field}
                values={catalog?.[field] || []}
              />
            ),
        )}
      </div>
    </div>
  );
}

export default Clientpage;
