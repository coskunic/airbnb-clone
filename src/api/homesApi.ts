import axios from "axios";
import type { Home } from "../types/home";

const apiClient = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getHomes = () => apiClient.get<Home[]>("/homes");
export const getHomeById = (id: string) => apiClient.get<Home>(`/homes/${id}`);
export const createHome = (home: Omit<Home, "id">) =>
  apiClient.post<Home>("/homes", home);
export const deleteHome = (id: number) => apiClient.delete(`/homes/${id}`);
