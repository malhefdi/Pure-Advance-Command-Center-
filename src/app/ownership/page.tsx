import { ModulePage } from "@/components/modules/ModulePage";
import { getModuleSummary } from "@/lib/seed-data";

export default function OwnershipPage() {
  return <ModulePage module={getModuleSummary("/ownership")} active="/ownership" />;
}
