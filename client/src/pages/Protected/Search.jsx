import React from "react";
import SearchInput from "../../components/search/SearchInput";
import ProfileBar from "../../components/search/ProfileBar";
import { Stack } from "@mui/material";

const Search = () => {
  return (
    <>
      <SearchInput />
      <Stack
        flexDirection={"column"}
        width={"90%"}
        maxWidth={"750px"}
        mx={"auto"}
        gap={1}
        mb={5}
      >
        <ProfileBar />
      </Stack>
    </>
  );
};

export default Search;
Search;
