import { EventCategory } from "./Event";

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  interests: EventCategory[];
  volunteerTime: number;
  enrolledEvents: string[];
  givenReviews: string[];
};
