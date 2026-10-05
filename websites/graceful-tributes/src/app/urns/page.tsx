import type { Metadata } from "next";
import { UrnGallery } from "@/components/urns/UrnGallery";

export const metadata: Metadata = {
  title: "The AETERNA Collection",
  description:
    "Hand-finished keepsake urns, chosen on their own or as part of an arrangement. Plain prices, careful delivery.",
};

export default function Page() {
  return <UrnGallery />;
}
