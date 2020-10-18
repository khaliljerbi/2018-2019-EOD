/* eslint-disable no-underscore-dangle */
import React from 'react';
import ReactTable from 'react-table';

const options = {
  previousText: 'Précédent',
  nextText: 'Suivant',
  loadingText: 'Chargement...',
  noDataText: 'Pas de données trouvées',
  pageText: 'Page',
  ofText: 'sur',
  rowsText: 'lignes',
  defaultPageSize: 10,
};
const CustomTable = ({ columns, data, ...props }) => (
  <ReactTable className="-striped -highlight" {...options} columns={columns} data={data} {...props} />
);

export default CustomTable;
