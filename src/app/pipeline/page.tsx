import { ModulePage } from "@/components/modules/ModulePage";
import { moduleSummaries } from "@/lib/seed-data";
export default function PipelinePage() { return <ModulePage module={moduleSummaries[3]} active="/pipeline" />; }
