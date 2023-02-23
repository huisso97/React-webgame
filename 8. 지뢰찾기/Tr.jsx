import React, { useContext } from 'react';
import Td from './Td';
import { TableContext } from './MineSearch';

const Tr = () => {
  const { tableData } = useContext(TableContext);

  return (
    <tr>
      <Td />
    </tr>
  );
};

export default Tr;
