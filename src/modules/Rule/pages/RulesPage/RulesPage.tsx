import CONFIG from "@/configs";
import { Box } from "@mui/material";
import RuleCreateForm from "./RuleCreateForm";
import RuleTable from "./RuleTable";

function RulesPage() {
  return (
    <Box sx={{ padding: CONFIG.LAYOUT_PADDING }}>
      <RuleCreateForm />
      <RuleTable />
    </Box>
  );
}

export default RulesPage;
