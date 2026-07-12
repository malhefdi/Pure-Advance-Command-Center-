import { ModulePage } from "@/components/modules/ModulePage";
import { getModuleSummary } from "@/lib/seed-data";

export default function AIPage() {
  return <ModulePage module={getModuleSummary("/ai")} active="/ai" />;
}
