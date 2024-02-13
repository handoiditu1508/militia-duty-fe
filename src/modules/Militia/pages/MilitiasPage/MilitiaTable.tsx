import Suspense from "@/components/Suspense";
import Militia from "@/models/entities/Militia";
import { ConfirmationDialogContext } from "@/providers/ConfirmationDialogProvider";
import { useDeleteMilitiaMutation, useGetMilitiasQuery } from "@/redux/apis/militiaApi";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Table, TableBody, TableCell, TableContainer, TableContainerProps, TableHead, TableRow, styled } from "@mui/material";
import React, { useContext, useState } from "react";

const MilitiaEditDialog = React.lazy(() => import("./MilitiaEditDialog"));

const MilitiaTable = styled((props: TableContainerProps) => {
  const { openDialog } = useContext(ConfirmationDialogContext);
  const [editDialogLoad, setEditDialogLoad] = useState<boolean>(false);
  const [editingMilitia, setEditingMilitia] = useState<Militia>();

  const {
    data: militias,
    isFetching: isFetchingMilitias,
    isLoading: isLoadingMilitias,
  } = useGetMilitiasQuery();

  const [deleteMilitia, { isLoading }] = useDeleteMilitiaMutation();

  const handleDelete = (militia: Militia) => {
    openDialog(
      `Xóa ${militia.name}?`,
      {
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
        onConfirm: async () => {
          try {
            await deleteMilitia(militia.id).unwrap();
          } catch (error) {
            console.error(error);
          }
        },
      }
    );
  };

  const handleExitEditDialog = () => {
    setEditingMilitia(undefined);
  };

  const handleEditMilitia = (militia: Militia) => {
    setEditDialogLoad(true);
    setEditingMilitia(militia);
  };

  return (
    <>
      <TableContainer {...props}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Điểm trực</TableCell>
              <TableCell>Điểm coi cổng</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {militias && militias.map((militia) => (
              <TableRow key={militia.id} hover>
                <TableCell>{militia.id}</TableCell>
                <TableCell>{militia.name}</TableCell>
                <TableCell>{militia.dutyDateScore}</TableCell>
                <TableCell>{militia.assignmentScore}</TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    color="warning"
                    disabled={isLoading}
                    onClick={() => handleEditMilitia(militia)}
                  >
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    disabled={isLoading}
                    onClick={() => handleDelete(militia)}
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Suspense fallbackType="backdrop">
        {editDialogLoad && editingMilitia && <MilitiaEditDialog
          open={!!editingMilitia}
          militia={editingMilitia}
          onClose={handleExitEditDialog}
          onExit={handleExitEditDialog}
        />}
      </Suspense>
    </>
  );
})(() => ({
  maxHeight: 700,
}));

export default MilitiaTable;
