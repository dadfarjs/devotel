import {
  Alert,
  Box,
  Chip,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getSubmissions } from "../services/api";
import { HomeListResponse } from "../types/form";

const HomeList = () => {
  const { data, isLoading, error } = useQuery<HomeListResponse>({
    queryKey: ["homes"],
    queryFn: getSubmissions,
  });

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
    return <Alert severity="error">Failed to load homes</Alert>;
  }

  if (!data || !data.data.length) {
    return <Alert severity="info">No homes found</Alert>;
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "success";
      case "pending":
        return "warning";
      case "rejected":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {data.columns.map((column) => (
                <TableCell key={column}>{column}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data.map((row) => (
              <TableRow key={row.id}>
                {data.columns.map((column) => (
                  <TableCell key={`${row.id}-${column}`}>
                    {column === "Status" ? (
                      <Chip
                        label={row[column]}
                        color={getStatusColor(row[column] as string)}
                      />
                    ) : (
                      row[column]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default HomeList;
