import Displayscore from "./Displayscore";
import PerformanceScore from "./Performancescore";
import CameraScore from "./Camerascorse";
import BatteryScore from "./Batteryscore";
import ConnectivityScore from "./Connectivityscore";
import DesignScore from "./Designscore";
import { unstable_cache } from "next/cache";
import { CACHE_TIME } from "@/lib/data";

export default async function Scorecalculator(product) {
  const productid = product?._id;
  return unstable_cache(
    async () => {
      //   screen
      const maxscreenvalues = {
        ppi: 522,
        brightness: 7000,
        refreshRate: 180,
        screenToBody: 174.37,
      };
      const dscore = Displayscore(product, maxscreenvalues);

      //   performance
      const maxPerformanceValues = {
        antutu: 4180000, // future-proof
        cpuClock: 5.1, // GHz
        maxcores: 16,
        ram: 32, // GB
        storage: 4096, // GB
      };
      const pscore = PerformanceScore(product, maxPerformanceValues);

      //   camera
      const camscore = CameraScore(product);

      //   battery
      const bscore = BatteryScore(product);
      //   network
      const connscore = ConnectivityScore(product);
      //   design
      const desscore = DesignScore(product);

      const total = dscore + pscore + camscore + bscore + connscore + desscore;
      const clamped = Math.min(Math.round(total / 6), 100);
      const totalscore = Math.round(50 + (clamped / 100) * 50);

      return {
        totalscore: totalscore,
        displayscore: dscore,
        performancescore: pscore,
        camerascore: camscore,
        batteryscore: bscore,
        connectionscore: connscore,
        designscore: desscore,
      };
    },
    [`score-${productid}`],
    { revalidate: CACHE_TIME, tags: [`score-${productid}`, "score", "all"] },
  )();
}
