import type { EventReview } from "./Review";
import type { User } from "./User";

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

export type EventVolunteer = Pick<
  User,
  "_id" | "firstName" | "lastName" | "email"
>;

export type EventDetails = {
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
  volunteers: EventVolunteer[];
  reviews: EventReview[];
  avg_rating: number;
};
