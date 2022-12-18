import React from 'react'

function Table(cols, data, functions,functionname) {
  return (
    <div>
        <table>
            <thead>
                <tr>
                    {cols.map((col) => (
                        <th>{col}</th>
                    ))}
                    
                </tr>
            </thead>
            <tbody>
                {
                data.length >0 ? data.map((row) => (
                    <tr>
                        {cols.map((col) => (
                            <td>{row[col]}</td>
                        ))}
                        {typeof functions !== 'undefined' ? (
                            (
                                <td>
                                    <button onClick={() => functions(row.id)}>{functionname}</button>
                                </td>
                            )
                        ):(<td></td>
                        )
                        }
                    </tr>
                ))

                : (
                <tr>
                    <td colSpan={cols.length}>No data</td>
                </tr>)
                }
            </tbody>
        </table>  
    </div>
  )
}

export default Table