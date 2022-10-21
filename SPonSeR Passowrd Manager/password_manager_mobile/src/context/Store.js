import React, { createContext } from "react";

const Store = createContext({
    lockApp: "",
    setLockApp: "",
    storedWebsites: "",
    setStoredWebsites: "",
    storedAccounts: "",
    setStoredAccounts: "",
    setFilteredWebsites: "",
    filteredWebsites: "",
})

export default Store;
