import { ModulePage } from "@/components/modules/ModulePage";
import { moduleSummaries } from "@/lib/seed-data";
export default function TeamPage() { return <ModulePage module={moduleSummaries[1]} active="/team" />; }
