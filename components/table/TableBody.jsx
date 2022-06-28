export default function TableBody({ bodyData, tableHead }) {
  return (
    <tbody>
      {bodyData.map((row, rowIdx) => {
        return (
          <tr key={rowIdx}>
            {tableHead.map((head, idx) => {
              return (
                <td
                  key={idx}
                  className="p-1 px-8 py-2 text-center border rounded-lg border-slate-700 "
                >
                  {row[head]}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
}
