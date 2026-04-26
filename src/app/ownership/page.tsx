import { ModulePage } from "@/components/modules/ModulePage";
import { moduleSummaries } from "@/lib/seed-data";
export default function OwnershipPage() { return <ModulePage module={moduleSummaries[4]} active="/ownership" />; }
