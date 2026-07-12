import { ModulePage } from "@/components/modules/ModulePage";
import { getModuleSummary } from "@/lib/seed-data";

export default function PipelinePage() {
  return <ModulePage module={getModuleSummary("/pipeline")} active="/pipeline" />;
}
