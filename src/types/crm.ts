export type PartnerType = "current" | "prospect" | "outreach";
export type PartnerCategory =
  | "investor"
  | "manufacturer"
  | "academic"
  | "government"
  | "supplier"
  | "client"
  | "partner";
export type PartnerStatus = "active" | "pending" | "dormant" | "lost";

export type InteractionType =
  | "call"
  | "email"
  | "meeting"
  | "whatsapp"
  | "document"
  | "note";

export interface Partner {
  partnerId: string;
  name: string;
  type: PartnerType;
  category: PartnerCategory;
  status: PartnerStatus;
  organization?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  notes: string;
  tags: string[];
  lastContactDate?: string;
  nextFollowUp?: string;
  dealValue?: number;
  products: string[];
  createdAt: string;
}

export interface Interaction {
  interactionId: string;
  partnerId: string;
  type: InteractionType;
  date: string;
  summary: string;
  followUpDate?: string;
  createdBy: string;
}

export interface CrmSnapshot {
  partners: Partner[];
  interactions: Interaction[];
}
