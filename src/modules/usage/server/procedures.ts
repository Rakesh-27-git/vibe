import { getUsageStatus } from "@/lib/usage";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const usageRouter = createTRPCRouter({
  status: baseProcedure.query(async () => {
    try {
      const result = await getUsageStatus();
      console.log("Usage status:", result);
      return result;
    } catch {
      return null;
    }
  }),
});
