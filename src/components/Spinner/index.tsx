import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const FallbackSpinner = () => {
  return (
    <Box
      sx={{
        height: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress disableShrink />
    </Box>
  );
};

export default FallbackSpinner;
