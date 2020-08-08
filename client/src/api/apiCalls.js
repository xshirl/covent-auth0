import api from "./apiConfig";

export const createEvent = async (payload) => {
  try {
    const response = await api.post("/events", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getEvents = async () => {
  try {
    const response = await api.get("/events?public");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateEventById = async (id, payload) => {
  try {
    const response = await api.put(`/event/${id}`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteMovieById = async (id) => {
  try {
    const response = await api.delete(`/event/${id}`);
  } catch (error) {
    throw error;
  }
};

export const getEvent = async (id) => {
  try {
    const response = await api.get(`/event/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
