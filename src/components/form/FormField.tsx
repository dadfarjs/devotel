import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { getDependentOptions } from "../../services/api";
import {
  FormFieldType,
  FormGroupField,
  FormInputField,
} from "../../types/form";

interface FormFieldProps {
  field: FormFieldType;
}

const FormField = ({ field }: FormFieldProps) => {
  if (field.type === "group") {
    const groupField = field as FormGroupField;
    return (
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          {groupField.label}
        </Typography>
        <Box sx={{ display: "grid", gap: 2 }}>
          {groupField.fields.map((subField) => (
            <FormField key={subField.id} field={subField} />
          ))}
        </Box>
      </Box>
    );
  }

  return <InputField field={field as FormInputField} />;
};

const InputField = ({ field }: { field: FormInputField }) => {
  const methods = useFormContext<any>();
  const { control, watch } = methods;
  const [dynamicOptions, setDynamicOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [isVisible, setIsVisible] = useState(true);

  const visibilityDependentValue = field.visibility?.dependsOn
    ? watch(field.visibility.dependsOn)
    : undefined;
  const dynamicDependentValue = field.dynamicOptions?.dependsOn
    ? watch(field.dynamicOptions.dependsOn)
    : undefined;

  useEffect(() => {
    if (field.visibility) {
      const { condition, value } = field.visibility;
      const currentValue = visibilityDependentValue?.toString();
      const targetValue = value.toString();
      const isVisible =
        condition === "equals"
          ? currentValue === targetValue
          : currentValue !== targetValue;
      setIsVisible(isVisible);
    }
  }, [field.visibility, visibilityDependentValue]);

  useEffect(() => {
    const fetchDynamicOptions = async () => {
      if (field.dynamicOptions && dynamicDependentValue) {
        try {
          const options = await getDependentOptions(
            field.dynamicOptions,
            dynamicDependentValue
          );
          setDynamicOptions(options);
          methods.resetField(field.id);
        } catch (error) {
          console.error("Failed to fetch dynamic options:", error);
        }
      }
    };

    fetchDynamicOptions();
  }, [field.dynamicOptions, dynamicDependentValue, field.id]);

  const renderField = () => {
    switch (field.type) {
      case "text":
        return (
          <Controller
            name={field.id}
            control={control}
            defaultValue=""
            rules={{ required: field.required }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                fullWidth
                label={field.label}
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error?.message}
                required={field.required}
              />
            )}
          />
        );

      case "number":
        return (
          <Controller
            name={field.id}
            control={control}
            defaultValue=""
            rules={{
              required: field.required,
              min: field.validation?.min,
              max: field.validation?.max,
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                fullWidth
                type="number"
                label={field.label}
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error?.message}
                required={field.required}
                inputProps={{
                  min: field.validation?.min,
                  max: field.validation?.max,
                }}
              />
            )}
          />
        );

      case "select": {
        const options = field.dynamicOptions ? dynamicOptions : field.options;
        return (
          <Controller
            name={field.id}
            control={control}
            defaultValue=""
            rules={{ required: field.required }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <FormControl fullWidth error={!!error} required={field.required}>
                <FormLabel>{field.label}</FormLabel>
                <Select value={value} onChange={onChange}>
                  {options?.map((option: any) => (
                    <MenuItem
                      key={typeof option === "string" ? option : option.value}
                      value={typeof option === "string" ? option : option.value}
                    >
                      {typeof option === "string" ? option : option.label}
                    </MenuItem>
                  ))}
                </Select>
                {error && <FormHelperText>{error.message}</FormHelperText>}
              </FormControl>
            )}
          />
        );
      }

      case "radio":
        return (
          <Controller
            name={field.id}
            control={control}
            defaultValue=""
            rules={{ required: field.required }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <FormControl error={!!error} required={field.required}>
                <FormLabel>{field.label}</FormLabel>
                <RadioGroup value={value} onChange={onChange}>
                  {field.options?.map((option: any) => (
                    <FormControlLabel
                      key={typeof option === "string" ? option : option.value}
                      value={typeof option === "string" ? option : option.value}
                      control={<Radio />}
                      label={typeof option === "string" ? option : option.label}
                    />
                  ))}
                </RadioGroup>
                {error && <FormHelperText>{error.message}</FormHelperText>}
              </FormControl>
            )}
          />
        );

      case "checkbox":
        return (
          <Controller
            name={field.id}
            control={control}
            defaultValue={[]}
            rules={{ required: field.required }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <FormControl error={!!error} required={field.required}>
                <FormLabel>{field.label}</FormLabel>
                <FormGroup>
                  {field.options?.map((option: any) => (
                    <FormControlLabel
                      key={typeof option === "string" ? option : option.value}
                      control={
                        <Checkbox
                          checked={value?.includes(
                            typeof option === "string" ? option : option.value
                          )}
                          onChange={(e) => {
                            const optionValue =
                              typeof option === "string"
                                ? option
                                : option.value;
                            const newValue = e.target.checked
                              ? [...(value || []), optionValue]
                              : (value || []).filter(
                                  (v: string) => v !== optionValue
                                );
                            onChange(newValue);
                          }}
                        />
                      }
                      label={typeof option === "string" ? option : option.label}
                    />
                  ))}
                </FormGroup>
                {error && <FormHelperText>{error.message}</FormHelperText>}
              </FormControl>
            )}
          />
        );

      case "date":
        return (
          <Controller
            name={field.id}
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                fullWidth
                type="date"
                label={field.label}
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error?.message}
                required={field.required}
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
        );

      default:
        return null;
    }
  };

  if (!isVisible) return null;

  return <Box sx={{ mb: 2 }}>{renderField()}</Box>;
};

export default FormField;
