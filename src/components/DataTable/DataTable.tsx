import React from "react";
import cx from "classnames";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useIsDarkMode } from "state/user/hooks";

import { fetchLogo } from "hooks";

const useStyles = makeStyles(({ palette }) => ({
  root: {},
  caption: {
    captionSide: "top!important" as "top",
    textAlign: "center!important" as "center",
    fontSize: "32px!important" as "32px",
    color: palette.text.primary + "!important",
  },
  poolLogo: {
    height: "30px",
  },
}));

export interface DataTableProps {
  logo?: boolean;
  title: string;
  heading: any;
  rows: any;
}

const DataTable: React.FC<DataTableProps> = ({
  logo = false,
  title,
  heading,
  rows,
}) => {
  const { breakpoints } = useTheme();
  const dark = useIsDarkMode();
  const mobile = useMediaQuery(breakpoints.down("xs"));
  const classes = useStyles({ dark, mobile });

  return (
    <Box className={cx(classes.root)}>
      <TableContainer component={Box}>
        <Table aria-label="simple table">
          <caption className={cx(classes.caption)}>{title}</caption>
          <TableHead>
            <TableRow>
              {logo && <TableCell align="center">Logo</TableCell>}
              {heading.map((column: any, i: any) => (
                <TableCell key={i}>
                  {column}
                  &nbsp;
                  <i className="fas fa-sort" />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: any, i: any) => (
              <TableRow key={i}>
                {logo && (
                  <TableCell align="center">
                    <img
                      className={cx(classes.poolLogo)}
                      src={fetchLogo(row[0])}
                      alt="pool-logo"
                    />
                  </TableCell>
                )}
                {row.map((cell: any, j: any) => (
                  <TableCell
                    key={j}
                    dangerouslySetInnerHTML={{ __html: cell }}
                  ></TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DataTable;
