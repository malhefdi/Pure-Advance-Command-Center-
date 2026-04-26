import { ModulePage } from "@/components/modules/ModulePage";
import { moduleSummaries } from "@/lib/seed-data";
export default function FinancePage() { return <ModulePage module={moduleSummaries[2]} active="/finance" />; }
