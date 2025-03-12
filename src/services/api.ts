import axios from "axios";
import {
  DynamicOptions,
  FormStructure,
  FormSubmission,
  HomeListResponse,
} from "../types/form";

const BASE_URL = "https://assignment.devotel.io";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "home/json",
  },
});

export const getFormStructure = async (): Promise<FormStructure> => {
  const response = await api.get("/api/insurance/forms");
  return response.data;
};

export const submitForm = async (formData: any): Promise<void> => {
  await api.post("/api/insurance/forms/submit", formData);
};

export const getSubmissions = async (): Promise<HomeListResponse> => {
  const response = await api.get("/api/insurance/forms/submissions");
  return response.data;
};
export const getSubmissionById = async (
  id: string
): Promise<FormSubmission> => {
  const response = await api.get<FormSubmission>(
    `/api/insurance/forms/submissions/${id}`
  );
  return response.data;
};

export const createSubmission = async (
  data: Omit<FormSubmission, "id" | "createdAt" | "updatedAt">
): Promise<FormSubmission> => {
  const response = await api.post<FormSubmission>(
    "/api/insurance/forms/submissions",
    data
  );
  return response.data;
};

export const updateSubmission = async (
  id: string,
  data: Partial<FormSubmission>
): Promise<FormSubmission> => {
  const response = await api.patch<FormSubmission>(
    `/api/insurance/forms/submissions/${id}`,
    data
  );
  return response.data;
};

export const deleteSubmission = async (id: string): Promise<void> => {
  await api.delete(`/api/insurance/forms/submissions/${id}`);
};

export const getDependentOptions = async (
  dynamicOptions: DynamicOptions,
  dependentValue: string
): Promise<{ label: string; value: string }[]> => {
  const response = await api.get(dynamicOptions?.endpoint, {
    params: { [dynamicOptions?.dependsOn]: dependentValue },
  });
  return response.data?.states;
};
