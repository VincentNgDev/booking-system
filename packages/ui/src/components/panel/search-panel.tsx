"use client";

import { cn } from "@workspace/ui/lib/utils";
import React from "react";
import { FormPage } from "../form-field/edit/form-field";

type SearchContextType = {
  searchResults: Record<string, any>[];
  setSearchedResults: (results: any[]) => void;
};

const SearchContext = React.createContext<SearchContextType | undefined>(
  undefined
);

function useSearchContext() {
  const context = React.useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
}

function SearchProvider({ children }: { children: React.ReactNode }) {
  const [results, setResults] = React.useState<Record<string, any>[]>([]);

  const setSearchedResults = React.useCallback(
    (results: Record<string, any>[]) => {
      setResults(results);
    },
    [setResults]
  );

  const contextValue = React.useMemo(
    () => ({
      searchResults: results,
      setSearchedResults,
    }),
    []
  );

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
}

type SearchPanelProps = {
  tableName?: string;
  className?: string;
  panelSearch?: (searchArgs: { customResult: Record<string, any>[] }) => void;
};

function SearchPanelCore({
  tableName,
  className,
  panelSearch,
}: SearchPanelProps) {
  const { searchResults, setSearchedResults } = useSearchContext();
  return (
    <div className={cn("w-full, h-full")}>
      <FormPage>
      </FormPage>
    </div>
  );
}

export function SearchPanel<TSearchObject>(props: SearchPanelProps) {
  return (
    <SearchProvider>
      <SearchPanelCore {...props} />
    </SearchProvider>
  );
}

function AdvancedSearch() {
  return <div>Advanced Search</div>;
}
