import { Alert, Button, Paper, Snackbar, Typography } from "@mui/material";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { submitForm } from "../services/api";
import {
  FormFieldType,
  FormGroupField,
  FormInputField,
  FormStructure,
} from "../types/form";
import FormFieldComponent from "./form/FormField";
import FormSectionComponent from "./form/FormSection";

interface DynamicFormProps {
  formStructure: FormStructure;
}

const DynamicForm = ({ formStructure }: DynamicFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const methods = useForm({ mode: "onChange" });

  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      await submitForm({ formId: formStructure.formId, data });
      setSubmitSuccess(true);
      methods.reset();
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Failed to submit form"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSubmitSuccess(false);
    setSubmitError(null);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography id="title-form" variant="h5" gutterBottom>
        {formStructure.title}
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {formStructure.fields.map((field: FormFieldType) => {
            if (field.type === "group") {
              return (
                <FormSectionComponent
                  key={field.id}
                  section={field as FormGroupField}
                />
              );
            }
            return (
              <FormFieldComponent
                key={field.id}
                field={field as FormInputField}
              />
            );
          })}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </FormProvider>

      <Snackbar
        open={!!submitError || submitSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={submitError ? "error" : "success"}
        >
          {submitError || "Form submitted successfully!"}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default DynamicForm;
