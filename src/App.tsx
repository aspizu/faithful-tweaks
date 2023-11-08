import React, { useEffect, useState } from "react";
import "./App.css";
import { ChakraProvider, useColorMode } from "@chakra-ui/react";
import { Main } from "./Main";
function App() {
  return (
    <ChakraProvider>
      <Main />
    </ChakraProvider>
  );
}

export default App;
