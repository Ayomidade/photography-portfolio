/**
 * api.js
 *
 * Centralised API service layer for all HTTP calls to the Express backend.
 * All components import from here — no raw fetch calls inside components.
 *
 * Base URL reads from the Vite environment variable so it works
 * across dev (proxied to localhost:5000) and production (real domain).
 *
 * Each function returns the parsed response data directly so
 * components don't need to call .json() themselves.
 */

const BASE_URL = "/api";

const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data;
};

// ── Photos ──
export const getPhotos = (params = "") =>
  fetch(`${BASE_URL}/photos${params}`).then(handleResponse);

export const getPhotoById = (id) =>
  fetch(`${BASE_URL}/photos/${id}`).then(handleResponse);

// ── Collections ──
export const getCollections = () =>
  fetch(`${BASE_URL}/collections`).then(handleResponse);

export const getCollectionBySlug = (slug) =>
  fetch(`${BASE_URL}/collections/slug/${slug}`).then(handleResponse);

// ── Journal ──
export const getPosts = (params = "") =>
  fetch(`${BASE_URL}/journal${params}`).then(handleResponse);

export const getPostById = (id) =>
  fetch(`${BASE_URL}/journal/${id}`).then(handleResponse);

// ── Contact ──
export const sendContactMessage = async (formData) => {
  const res = await fetch(`${BASE_URL}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  return handleResponse(res);
};
