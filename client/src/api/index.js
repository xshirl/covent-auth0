import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const insertEvent = (payload) => api.post(`/events`, payload);
export const getEvents = () => api.get(`/events`);
export const updateEventById = (id, payload) =>
  api.put(`/events/${id}`, payload);
export const deleteMovieById = (id) => api.delete(`/event/${id}`);
export const getEventById = (id) => api.get(`/event/${id}`);

const apis = {
  insertEvent,
  getEvents,
  updateEventById,
  deleteMovieById,
  getEventById,
};

export default apis;
