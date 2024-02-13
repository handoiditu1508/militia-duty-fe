import CONFIG from "@/configs";
import { Box } from "@mui/material";
import MilitiaCreateForm from "./MilitiaCreateForm";
import MilitiaTable from "./MilitiaTable";

function MilitiasPage() {
  return (
    <Box sx={{ padding: CONFIG.LAYOUT_PADDING }}>
      <MilitiaCreateForm />
      <MilitiaTable />
    </Box>
  );
}

export default MilitiasPage;
