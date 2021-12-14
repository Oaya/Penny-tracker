import React from "react";
import PropTypes from "prop-types";

import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";
import DeleteIcon from "@mui/icons-material/Delete";
import { StylesProvider } from "@material-ui/core/styles";

const TableContent = ({ deleteItem, items }) => {
  return (
    <div>
      <StylesProvider injectFirst>
        <Table className="table">
          <TableHead className="table__head">
            <TableRow>
              <TableCell className="table__head-cell">Date</TableCell>
              <TableCell className="table__head-cell" align="right">
                Content
              </TableCell>
              <TableCell className="table__head-cell" align="right">
                Amount
              </TableCell>
              <TableCell className="table__head-cell" align="right"></TableCell>
            </TableRow>
          </TableHead>

          <TableBody className="table__body">
            {items.map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableCell
                    className="table__body-cell"
                    component="th"
                    scope="row"
                  >
                    {item.date}
                  </TableCell>
                  <TableCell className="table__body-cell" align="right">
                    {item.title}
                  </TableCell>
                  <TableCell className="table__body-cell" align="right">
                    ${item.cost}
                  </TableCell>
                  <TableCell className="table__body-cell" align="right">
                    <DeleteIcon
                      style={{ fontSize: 25 }}
                      className="table__icon"
                      key={item.id}
                      id={item.id}
                      onClick={() => {
                        deleteItem(item);
                      }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </StylesProvider>
    </div>
  );
};

export default TableContent;

TableContent.propTypes = {
  items: PropTypes.array.isRequired,
  deleteItem: PropTypes.func.isRequired,
};
