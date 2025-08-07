import React from 'react';
import { useTable } from 'react-table';
import './PortfolioTable.css';

export default function PortfolioTable({ data }) {
  const columns = React.useMemo(() => [
    { Header: 'Particulars', accessor: 'particulars' },
    { Header: 'Purchase Price', accessor: 'purchasePrice' },
    { Header: 'Qty', accessor: 'qty' },
    { Header: 'Investment', accessor: 'investment' },
    { Header: 'Portfolio %', accessor: 'portfolioPct' },
    { Header: 'Exchange', accessor: 'exchange' },
    { Header: 'CMP', accessor: 'cmp' },
    { Header: 'Present Value', accessor: 'presentValue' },
    { Header: 'Gain/Loss', accessor: 'gainLoss',
      Cell: ({ value }) => (
        <span className={value >= 0 ? 'gain' : 'loss'}>
          {value.toFixed(2)}
        </span>
      )
    },
    { Header: 'P/E Ratio', accessor: 'peRatio' },
    { Header: 'Latest Earnings', accessor: 'latestEarnings' }
  ], []);

  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
    <table {...getTableProps()} className="portfolio-table">
      <thead>
        {headerGroups.map(hg => (
          <tr {...hg.getHeaderGroupProps()}>
            {hg.headers.map(col => (
              <th {...col.getHeaderProps()}>{col.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
