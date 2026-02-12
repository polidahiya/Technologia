import React from "react";
import EnumManager from "./EnumManager";
import { Getautofillvalues } from "@/lib/autofillvaluesfn";

async function page() {
  const catalog = await Getautofillvalues();
  return (
    <div className="px-2 md:px-10 space-y-2">
      <EnumManager
        title="Device Type"
        field="deviceType"
        values={catalog.deviceType}
      />
      <EnumManager
        title="Availability"
        field="availability"
        values={catalog.availability}
      />
      <EnumManager
        title="Currency"
        field="currency"
        values={catalog.currency}
      />
      <EnumManager
        title="Display Types"
        field="displayTypes"
        values={catalog.displayTypes}
      />
      <EnumManager
        title="Camera Cutouts"
        field="cameraCutouts"
        values={catalog.cameraCutouts}
      />
      <EnumManager
        title="Screen Protections"
        field="screenProtections"
        values={catalog.screenProtections}
      />
      <EnumManager
        title="Chipsets"
        field="chipsets"
        values={catalog.chipsets}
      />
      <EnumManager
        title="Mobile GPUs"
        field="mobileGPUs"
        values={catalog.mobileGPUs}
      />
      <EnumManager
        title="Ram Types"
        field="ramTypes"
        values={catalog.ramTypes}
      />
      <EnumManager
        title="Storage"
        field="storage"
        values={catalog.storage}
      />
      <EnumManager
        title="Storage Type"
        field="storageType"
        values={catalog.storageType}
      />
      <EnumManager
        title="Battery Type"
        field="batteryType"
        values={catalog.batteryType}
      />
      <EnumManager
        title="OS Types"
        field="osTypes"
        values={catalog.osTypes}
      />
      <EnumManager
        title="Fingerprints"
        field="Fingerprints"
        values={catalog.Fingerprints}
      />
      <EnumManager
        title="Usb Connectors"
        field="usbConnectors"
        values={catalog.usbConnectors}
      />

      <EnumManager
        title="Smartphone Awards"
        field="smartphoneAwards"
        values={catalog.smartphoneAwards}
      />
    </div>
  );
}

export default page;
