export default function TableBody({ BODY_DATA }) {
  return (
    <tbody>
      {BODY_DATA.map((row, rowIdx) => {
        return (
          <tr key={rowIdx}>
            {row.map((data, idx) => {
              return (
                <td key={idx} className="px-8 py-2 text-center ">
                  {data}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
}
