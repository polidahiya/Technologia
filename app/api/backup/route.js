import Verification from "@/lib/verification";
import { getcollection } from "@/lib/db";

export async function GET() {
  try {
    const tokenres = await Verification();
    if (!tokenres?.verified) {
      return new Response(JSON.stringify({ message: "Invalid user" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    const { Productscollection } = await getcollection();

    // Fetch all data
    const backupData = {
      Orders: await Productscollection.find({}).toArray(),
    };

    const jsonString = JSON.stringify(backupData, null, 2);

    return new Response(jsonString, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename=Tecknologia-backup-${new Date().toISOString()}.json`,
      },
    });
  } catch (error) {
    console.error("Backup error:", error);
    return new Response(
      JSON.stringify({ message: "Backup failed", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
