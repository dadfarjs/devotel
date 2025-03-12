export interface ValidationRule {
  min?: number;
  max?: number;
  pattern?: string;
  message?: string;
}

export interface DynamicOptions {
  dependsOn: string;
  endpoint: string;
  method: string;
}

export interface VisibilityCondition {
  dependsOn: string;
  condition: "equals" | "notEquals";
  value: string | number | boolean;
}

export interface BaseField {
  id: string;
  label: string;
  type: string;
  required?: boolean;
}

export interface FormInputField extends BaseField {
  type: "text" | "number" | "select" | "radio" | "checkbox" | "date";
  options?: string[] | { label: string; value: string | number }[];
  validation?: ValidationRule;
  dynamicOptions?: DynamicOptions;
  visibility?: VisibilityCondition;
  defaultValue?: string | number | boolean;
}

export interface FormGroupField extends BaseField {
  type: "group";
  fields: FormFieldType[];
}

export type FormFieldType = FormInputField | FormGroupField;

export interface FormStructure {
  id: string;
  formId: string;
  title: string;
  fields: FormFieldType[];
}

export interface FormSubmission {
  id: string;
  formId: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
  data: Record<string, any>;
}

export interface ColumnDefinition {
  id: string;
  label: string;
  accessor: string;
  sortable?: boolean;
  filterable?: boolean;
}

export interface HomeData {
  id: string;
  [key: string]: string | number; // For dynamic column data
}

export interface HomeListResponse {
  columns: string[];
  data: HomeData[];
}
