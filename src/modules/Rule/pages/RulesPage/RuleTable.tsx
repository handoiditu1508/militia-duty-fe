import { minutesToHourString } from "@/common/formats";
import Mission from "@/models/entities/Mission";
import Rule, { ruleTypeNameMap } from "@/models/entities/Rule";
import { ConfirmationDialogContext } from "@/providers/ConfirmationDialogProvider";
import { useGetMissionsQuery } from "@/redux/apis/missionApi";
import { useDeleteRuleMutation, useGetRulesQuery } from "@/redux/apis/ruleApi";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableContainerProps, TableHead, TableRow, Typography } from "@mui/material";
import { Fragment, useContext, useState } from "react";

function RuleTable(props: TableContainerProps) {
  const { openDialog } = useContext(ConfirmationDialogContext);
  const [openingRow, setOpeningRow] = useState<number>();

  const {
    data: rules,
    isFetching: isFetchingRules,
    isLoading: isLoadingRules,
  } = useGetRulesQuery();

  const [deleteRule, { isLoading }] = useDeleteRuleMutation();

  const {
    data: missionsMap,
    isFetching: isFetchingMissions,
    isLoading: isLoadingMissions,
  } = useGetMissionsQuery(undefined, {
    selectFromResult: ({ data, ...others }) => {
      const missionMap = data
        ? data.reduce<Record<number, Mission>>((prevValue, currentValue) => {
          prevValue[currentValue.id] = currentValue;
          return prevValue;
        }, {})
        : undefined;
      return {
        data: missionMap,
        ...others,
      };
    },
  });

  const handleDelete = (rule: Rule) => {
    openDialog(
      `Xóa điều kiện số ${rule.id}?`,
      {
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
        onConfirm: async () => {
          try {
            await deleteRule(rule.id).unwrap();
          } catch (error) {
            console.error(error);
          }
        },
      }
    );
  };

  return (
    <TableContainer {...props}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Ngày Bắt Đầu</TableCell>
            <TableCell>Ngày Kết Thúc</TableCell>
            <TableCell>Loại</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {rules && rules.map((rule) => <Fragment key={rule.id}>
            <TableRow hover onClick={() => setOpeningRow(openingRow === rule.id ? undefined : rule.id)}>
              <TableCell>{rule.id}</TableCell>
              <TableCell>{rule.startDate.slice(0, 10)}</TableCell>
              <TableCell>{rule.endDate && rule.endDate.slice(0, 10)}</TableCell>
              <TableCell>{ruleTypeNameMap[rule.type]}</TableCell>
              <TableCell>
                <IconButton
                  size="small"
                  color="error"
                  disabled={isLoading}
                  onClick={() => handleDelete(rule)}
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ paddingY: 0 }} colSpan={5}>
                <Collapse in={openingRow === rule.id} timeout="auto" unmountOnExit>
                  <Box sx={{ margin: 1 }}>
                    {rule.description && <>
                      <Typography variant="h6">Ghi chú:</Typography>
                      <Typography variant="body2">{rule.description}</Typography>
                    </>}
                    {rule.militias.length && <>
                      <Typography variant="h6">Cơ động:</Typography>
                      <ul>
                        {rule.militias.map(militia => <Typography key={militia.id} component="li" variant="body2">{militia.name}</Typography>)}
                      </ul>
                    </>}
                    {rule.tasks.length && <>
                      <Typography variant="h6">Ca coi cổng:</Typography>
                      <ul>
                        {rule.tasks.map(task => <Typography key={task.id} component="li" variant="body2">
                          {missionsMap && missionsMap[task.missionId].name} {minutesToHourString(task.startMinute)} - {minutesToHourString(task.endMinute)}
                        </Typography>)}
                      </ul>
                    </>}
                    {rule.weeksdays && <>
                      <Typography variant="h6">Ngày trong tuần:</Typography>
                      <Typography variant="body2">{rule.weeksdays.join(", ")}</Typography>
                    </>}
                    {rule.numberValue && <>
                      <Typography variant="h6">Giá trị số:</Typography>
                      <Typography variant="body2">{rule.numberValue}</Typography>
                    </>}
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>
          </Fragment>)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RuleTable;
