import { useState, useRef } from "react";
import { useClickAway } from "react-use";

export const useSearch = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const searchRef = useRef(null);

  useClickAway(searchRef, () => setIsSearchOpen(false));

  return {
    isSearchOpen,
    searchText,
    setSearchText,
    setIsSearchOpen,
    searchRef,
  };
};
