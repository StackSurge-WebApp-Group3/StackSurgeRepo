export const EVENT_CATEGORIES = [
  "Environment",
  "Education",
  "Health",
  "Animals",
  "Arts & Culture",
  "Sports",
  "Other",
] as const;

export type EventCategory = (typeof EVENT_CATEGORIES)[number];

export type Event = {
  _id: string;
  title: string;
  description?: string;
  coverImage?: string;
  category: EventCategory;
  address?: string;
  city?: string;
  state?: string;
  datetime: string;
  duration: number;
  sponsors?: string[];
  totalAvailableSlots: number;
  status: "open" | "closed";
  volunteers: string[];
  reviews: string[];
  avg_rating: number;
};
