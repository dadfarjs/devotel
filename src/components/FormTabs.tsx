import { Alert, Box, CircularProgress, Tab, Tabs } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getFormStructure } from "../services/api";
import { FormStructure } from "../types/form";
import DynamicForm from "./DynamicForm";

interface FormsResponse {
  forms: FormStructure[];
}

const FormTabs = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const { data, isLoading, error } = useQuery<FormsResponse>({
    queryKey: ["formStructure"],
    queryFn: async () => {
      const response = await getFormStructure();
      return { forms: Array.isArray(response) ? response : [response] };
    },
  });

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">Failed to load insurance forms</Alert>;
  }

  if (!data?.forms.length) {
    return <Alert severity="info">No insurance forms available</Alert>;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="insurance form tabs"
        >
          {data.forms.map((form: FormStructure) => (
            <Tab
              key={form.id}
              label={form.title}
              sx={{
                color: "white",
              }}
            />
          ))}
        </Tabs>
      </Box>
      {data?.forms?.map((form: FormStructure, index: number) => (
        <Box
          key={form.id}
          role="tabpanel"
          hidden={selectedTab !== index}
          id={`insurance-tabpanel-${index}`}
          aria-labelledby={`insurance-tab-${index}`}
        >
          {selectedTab === index && <DynamicForm formStructure={form} />}
        </Box>
      ))}
    </Box>
  );
};

export default FormTabs;
