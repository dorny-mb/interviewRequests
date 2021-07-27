import { Flex, Spinner, Box } from "@chakra-ui/core";
import React, { ReactNode, useMemo } from "react";
import { ChevronDown, ChevronUp } from "react-feather";
import {
  Column,
  ColumnInstance,
  HeaderGroup,
  Row,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { H5, Text } from "../../typography";
import Card from "../Card";
import EmptyListHandler from "../EmptyListHandler";
import SearchBar from "../SearchBar";
import { StyledTable, TableCell, TableHead, TableRow } from "./styles";

declare module "react-table" {
  export interface TableOptions<D extends object>
    extends UsePaginationOptions<D>,
      UseFiltersOptions<D> {}

  export interface TableInstance<D extends object = {}>
    extends UsePaginationInstanceProps<D> {}

  export interface TableState<D extends object = {}>
    extends UsePaginationState<D> {}

  export interface ColumnInstance<D extends object = {}>
    extends UseSortByColumnProps<D> {}
}

type TableProps<D extends object = {}> = {
  data: any;
  pageSize?: number;
  tableHeading?: ReactNode;
  columns: Column<D>[];
  onRowClick?: (row: Row<D>) => void;
  isLoading?: boolean;
  tableActions?: () => ReactNode;
  onSearch?: (text: string) => void;
  onClickNext: () => Promise<any>;
  searchPlaceholder?: string;
  searching?: boolean;
  renderRowSubComponent?: (row: Row<D>) => ReactNode;
};
const Table = <D extends {}>({
  columns,
  data,
  tableHeading,
  onRowClick,
  isLoading,
  tableActions,
  onSearch,
  searching,
  searchPlaceholder,
  renderRowSubComponent,
}: TableProps<D>) => {
  const tableColumns = useMemo(() => columns, [columns]);

  const { getTableProps, headerGroups, prepareRow, page } = useTable<D>(
    {
      columns: tableColumns,
      data: data,
    },
    useSortBy,
    usePagination
  );

  return (
    <>
      <Flex
        bg="white"
        py={4}
        px={10}
        width="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        {tableHeading && (
          <Flex alignItems="inherit">
            <H5 fontWeight="bold" mr={2}>
              {tableHeading}
            </H5>
          </Flex>
        )}
        <Flex align="center" width="100%">
          {!!onSearch && (
            <SearchBar
              flex={1}
              isLoading={searching}
              onSearch={onSearch}
              placeholder={searchPlaceholder}
            />
          )}
        </Flex>
        {tableActions && tableActions()}
      </Flex>

      {data?.length === 0 ? (
        <EmptyListHandler />
      ) : (
        <Box width="100%" px={10} py={4}>
          <Flex
            justify={isLoading ? "space-between" : "flex-end"}
            align="center"
          >
            {isLoading && (
              <Spinner
                thickness="2px"
                mx={3}
                speed="0.65s"
                emptyColor="gray.200"
                color="gray.500"
                size="sm"
              />
            )}
            <Text color="gray.500" fontSize="sm" fontWeight="bold" py={3}>
              {data?.length} interview requests
            </Text>
          </Flex>
          <Card flexDirection="column" width="100%">
            <StyledTable {...getTableProps()}>
              <TableHead>
                {headerGroups.map((headerGroup: HeaderGroup<D>, i) => (
                  <Flex
                    flex={1}
                    flexDirection="row"
                    {...headerGroup.getHeaderGroupProps()}
                    key={i}
                  >
                    {headerGroup.headers.map((column: ColumnInstance<D>, i) => (
                      <TableCell
                        {...column.getHeaderProps()}
                        key={i}
                        {...column.getSortByToggleProps()}
                        py={2}
                        px={4}
                        bg="gray.50"
                        textTransform="capitalize"
                        justifyContent="space-between"
                      >
                        <Text fontWeight="bold" fontSize="sm" color="gray.500">
                          {column.render("Header")}
                        </Text>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <ChevronDown size={20} />
                          ) : (
                            <ChevronUp size={20} />
                          )
                        ) : (
                          ""
                        )}
                      </TableCell>
                    ))}
                  </Flex>
                ))}
              </TableHead>
              <Flex flexDirection="column">
                {page?.map(
                  (row, key) =>
                    // @ts-ignore

                    prepareRow(row) || (
                      <React.Fragment key={key}>
                        <TableRow
                          onClick={() => onRowClick && onRowClick(row)}
                          flexDirection="row"
                          {...row.getRowProps()}
                        >
                          {row.cells.map((cell, i) => {
                            return (
                              <TableCell
                                justifyContent="flex-start"
                                color="gray.500"
                                p={4}
                                bg={
                                  // @ts-ignore
                                  cell?.row?.original?.archived
                                    ? "gray.50"
                                    : "white"
                                }
                                fontSize="sm"
                                fontWeight="bold"
                                {...cell.getCellProps()}
                                key={i}
                              >
                                {cell.render("Cell")}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                        {renderRowSubComponent && renderRowSubComponent(row)}
                      </React.Fragment>
                    )
                )}
              </Flex>
            </StyledTable>
          </Card>
        </Box>
      )}
    </>
  );
};

export default Table;

Table.defaultProps = {
  pageSize: 10,
};
