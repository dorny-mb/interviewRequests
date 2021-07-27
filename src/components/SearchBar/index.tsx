import {
  Icon,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  Spinner,
} from "@chakra-ui/core";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { Search } from "react-feather";
import { useDebounce } from "../../hooks";

type SearchBarProps = InputProps & {
  onSearch: (text: string) => void;
  isLoading?: boolean;
};

const SearchBar: FC<SearchBarProps> = ({ onSearch, isLoading, ...rest }) => {
  const [searchTerm, setSearchTerm] = useState<string | undefined>();
  // usefull for intensive data colletions
  const debouncedSearchTerm = useDebounce(searchTerm, 100);

  useEffect(() => {
    if (onSearch) {
      onSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, onSearch]);

  return (
    <InputGroup>
      <Input
        {...rest}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchTerm(e.target.value)
        }
      />
      <InputRightElement>
        {isLoading ? <Spinner /> : <Icon as={Search} color="gray.400" />}
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchBar;

SearchBar.defaultProps = {
  width: "100%",
  minW: "160px",
  type: "text",
  placeholder: "Search...",
};
