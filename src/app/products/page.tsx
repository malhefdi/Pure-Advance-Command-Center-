import { ModulePage } from "@/components/modules/ModulePage";
import { moduleSummaries } from "@/lib/seed-data";
export default function ProductsPage() { return <ModulePage module={moduleSummaries[0]} active="/products" />; }
