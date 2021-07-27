import React, { useState } from "react";
import { PageWrap } from "../../layouts";
import interviewRequests from "../../data.json";
import { Table } from "../../components";
import { Cell, Row } from "react-table";
import { Flex, Avatar, Checkbox } from "@chakra-ui/core";
import { Text } from "../../typography";
import moment from "moment";
import styled from "@emotion/styled";

const DateContainer = styled.span`
  font-size: 0.7rem;
  color: #b1b1b1;
`;
const Lamp = styled.span`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: #00b300;
`;
const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string | undefined>();
  const [searching, setSearching] = useState(false);
  const [showArchieved, setShowArchieved] = useState(false);
  const [rawData, setRawData] = useState(interviewRequests);

  // was going to be usefull for async calls
  const [processing] = useState(false);

  const columns = [
    {
      Header: "candidate",
      accessor: "candidate",
      Cell: ({ row: { original } }: Cell<any>) => {
        const { image, candidate } = original;
        return (
          <Flex align="center">
            <Avatar src={image} mr={4} size="sm" />
            {candidate}
          </Flex>
        );
      },
    },
    { Header: "role", accessor: "role" },
    {
      Header: "last communication",
      accessor: "last_comms.date_time",
      Cell: ({ row: { original } }: Cell<any>) => {
        const { unread, description, date_time } = original.last_comms;
        return (
          <Flex align="center" width="auto" flex={1}>
            {unread && <Lamp />}
            <Flex mx={2} flex={1} fontSize="sm" color="gray.500">
              {description}
            </Flex>
            <DateContainer>{moment(date_time).fromNow()}</DateContainer>
          </Flex>
        );
      },
    },
    {
      Header: "salary",
      accessor: "salary",
      Cell: ({ row: { original } }: Cell<any>) => `R${original.salary}`,
    },
    { Header: "sent by", accessor: "sent_by" },
    {
      Header: " ",
      accessor: "archived",
      Cell: ({ row: { original } }: Cell<typeof rawData[0]>) => (
        <Text
          color="blue.300"
          fontWeight={400}
          onClick={() => {
            setRawData((prev) =>
              prev.map((e) =>
                e.id === original.id
                  ? Object.assign(e, { archived: !e.archived })
                  : e
              )
            );
          }}
        >
          {original.archived ? "unarchive" : "archive"}
        </Text>
      ),
    },
  ];

  const filteredData = showArchieved
    ? rawData
    : rawData.filter((data) => !data.archived);

  const data = filteredData.filter((data) =>
    data.candidate.toLowerCase().includes(searchTerm?.toLocaleLowerCase() || "")
  );

  return (
    <PageWrap title="Home" py={0}>
      <Table
        isLoading={processing}
        columns={columns}
        data={data}
        searching={searching}
        tableActions={() => (
          <Checkbox
            size="lg"
            fontSize="sm"
            onChange={() => setShowArchieved(!showArchieved)}
            variantColor="blue"
            isChecked={showArchieved}
            width="9rem"
          >
            <Text fontSize="sm">Show archived</Text>
          </Checkbox>
        )}
        onSearch={(value) => {
          setSearching(true);
          setSearchTerm(value);
          setSearching(false);
        }}
        onRowClick={(row: Row<any>) => {}}
        pageSize={10}
        onClickNext={async () => {}}
      />
    </PageWrap>
  );
};
export default Home;
