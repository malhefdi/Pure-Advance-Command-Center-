import { ModulePage } from "@/components/modules/ModulePage";
import { moduleSummaries } from "@/lib/seed-data";
export default function AIPage() { return <ModulePage module={moduleSummaries[5]} active="/ai" />; }
