import Militia from "@/models/entities/Militia";
import { Table, TableBody, TableCell, TableContainer, TableContainerProps, TableHead, TableRow, styled } from "@mui/material";
import React from "react";

type NameTableProps = TableContainerProps & {
  militias: Militia[];
}

const NameTable = styled(React.forwardRef<HTMLDivElement, NameTableProps>(({ militias, ...props }, ref) => {
  return (
    <TableContainer {...props} ref={ref}>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Tên</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {militias.map((militia) => (
            <TableRow key={militia.id}>
              <TableCell>{militia.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}))(() => ({
  maxHeight: 700,
  maxWidth: 100,
  ".MuiTableCell-root": {
    whiteSpace: "nowrap",
    "&.MuiTableCell-head": {
      height: 48,
    },
  },
  overflowY: "hidden",
  overflowX: "scroll",
}));

export default NameTable;
