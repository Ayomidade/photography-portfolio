/**
 * AdminTable
 *
 * Reusable data table for projects and photos.
 * Clean minimal style — light borders, no zebra stripes.
 *
 * Props:
 * - columns: [{ key, label, render? }]
 * - rows: array of data objects
 * - onEdit(id): called on edit click
 * - onDelete(id): called on delete click
 * - loading: boolean
 * - emptyMessage: string
 */

const AdminTable = ({
  columns = [],
  rows = [],
  onEdit,
  onDelete,
  loading,
  emptyMessage = "No data yet.",
}) => {
  const muted = "rgba(0,0,0,0.6)";
  const border = "1px solid rgba(0,0,0,0.07)";

  if (loading)
    return (
      <div style={{ padding: "48px 0", textAlign: "center" }}>
        <p
          style={{
            color: muted,
            fontSize: "10px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          Loading...
        </p>
      </div>
    );

  if (!rows.length)
    return (
      <div style={{ padding: "48px 0", textAlign: "center" }}>
        <p
          style={{
            color: muted,
            fontSize: "12px",
            letterSpacing: "0.1em",
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          {emptyMessage}
        </p>
      </div>
    );

  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "12px",
          fontFamily: "Montserrat, sans-serif",
        }}
      >
        <thead>
          <tr style={{ borderBottom: border }}>
            {columns.map(({ key, label }) => (
              <th
                key={key}
                style={{
                  textAlign: "left",
                  padding: "12px 16px",
                  fontSize: "9px",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: muted,
                  fontWeight: 400,
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </th>
            ))}
            <th
              style={{
                textAlign: "right",
                padding: "12px 16px",
                fontSize: "9px",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: muted,
                fontWeight: 400,
              }}
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row._id}
              style={{ borderBottom: border }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(0,0,0,0.015)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              {columns.map(({ key, render }) => (
                <td
                  key={key}
                  style={{
                    padding: "14px 16px",
                    color: "#1a1a1a",
                    verticalAlign: "middle",
                    fontWeight: 300,
                  }}
                >
                  {render ? render(row[key], row) : (row[key] ?? "—")}
                </td>
              ))}
              <td
                style={{
                  padding: "14px 16px",
                  textAlign: "right",
                  whiteSpace: "nowrap",
                }}
              >
                {onEdit && (
                  <button
                    onClick={() => onEdit(row._id)}
                    style={{
                      fontSize: "9px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: muted,
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      marginRight: "16px",
                      fontFamily: "Montserrat, sans-serif",
                      transition: "color 0.2s",
                      padding: 0,
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#1a1a1a")
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.color = muted)}
                  >
                    Edit
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(row._id)}
                    style={{
                      fontSize: "9px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: muted,
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "Montserrat, sans-serif",
                      transition: "color 0.2s",
                      padding: 0,
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#c0392b")
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.color = muted)}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
