import api from "./apiConfig";

// EVENTS

export const getEvents = async () => {
  try {
    const response = await api.get("/events?public");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getEvent = async (id) => {
  try {
    const response = await api.get(`/events/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createEvent = async (payload) => {
  try {
    const response = await api.post("/events", payload);
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

export const deleteEventById = async (id) => {
  try {
    const response = await api.delete(`/event/${id}`);
  } catch (error) {
    throw error;
  }
};

export const searchEvents = async (term) => {
  try {
    const response = await api.get(`/searchevents/${term}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// MESSAGES

export const getMessages = async () => {
  try {
    const response = await api.get(`/messages`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendMessage = async (bodyData) => {
  try {
    const response = await api.post(`/messages`, bodyData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const attendEvent = async (eventId) => {
  try {
    const response = await api.put(`/attendEvent/${eventId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
