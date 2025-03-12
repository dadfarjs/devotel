import { Box, Typography } from "@mui/material";
import { FormFieldType, FormGroupField } from "../../types/form";
import FormField from "./FormField";

interface FormSectionProps {
  section: FormGroupField;
}

const FormSection = ({ section }: FormSectionProps) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        {section.label}
      </Typography>
      <Box sx={{ pl: 2 }}>
        {section.fields.map((field: FormFieldType) => {
          if (field.type === "group") {
            return <FormSection key={field.id} section={field} />;
          }
          return <FormField key={field.id} field={field} />;
        })}
      </Box>
    </Box>
  );
};

export default FormSection;
