import type { EventCategory, EventDetails } from "./Event";
import type { EventReview } from "./Review";

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  interests: EventCategory[];
  volunteerTime: number;
  enrolledEvents: EventDetails[];
  givenReviews: EventReview[];
};
