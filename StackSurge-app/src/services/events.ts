import type { EventDetails } from "../types/Event";
import axiosClient from "./axiosClient";

export async function getEvents() {
  const { data } = await axiosClient.get<EventDetails[]>("/api/events");

  return data;
}
