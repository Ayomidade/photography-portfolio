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
import { useState } from "react";

const AdminTable = ({
  columns = [],
  rows = [],
  onEdit,
  onDelete,
  loading,
  emptyMessage = "Nothing here yet.",
}) => {
  const [hoveredRow, setHoveredRow] = useState(null);

  if (loading)
    return (
      <div style={{ padding: "56px 0", textAlign: "center" }}>
        <p
          style={{
            fontSize: "9px",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "rgba(0,0,0,0.25)",
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          Loading...
        </p>
      </div>
    );

  if (!rows.length)
    return (
      <div style={{ padding: "56px 0", textAlign: "center" }}>
        <p
          style={{
            fontSize: "11px",
            color: "rgba(0,0,0,0.3)",
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 300,
            letterSpacing: "0.06em",
          }}
        >
          {emptyMessage}
        </p>
      </div>
    );

  return (
    <>
      {/* Desktop table */}
      <div className="admin-table-desktop" style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
              {columns.map(({ key, label }) => (
                <th
                  key={key}
                  style={{
                    textAlign: "left",
                    padding: "11px 16px",
                    fontSize: "8px",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "rgba(0,0,0,0.3)",
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                  }}
                >
                  {label}
                </th>
              ))}
              <th
                style={{
                  textAlign: "right",
                  padding: "11px 16px",
                  fontSize: "8px",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "rgba(0,0,0,0.3)",
                  fontWeight: 500,
                }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr
                key={row._id}
                onMouseEnter={() => setHoveredRow(ri)}
                onMouseLeave={() => setHoveredRow(null)}
                style={{
                  borderBottom: "1px solid rgba(0,0,0,0.055)",
                  background:
                    hoveredRow === ri ? "rgba(0,0,0,0.018)" : "transparent",
                  transition: "background 0.15s",
                }}
              >
                {columns.map(({ key, render }) => (
                  <td
                    key={key}
                    style={{
                      padding: "13px 16px",
                      color: "#1a1a1a",
                      fontWeight: 300,
                      fontSize: "12px",
                      verticalAlign: "middle",
                      maxWidth: "240px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {render ? render(row[key], row) : (row[key] ?? "—")}
                  </td>
                ))}
                <td
                  style={{
                    padding: "13px 16px",
                    textAlign: "right",
                    whiteSpace: "nowrap",
                  }}
                >
                  {onEdit && (
                    <button
                      onClick={() => onEdit(row._id)}
                      style={{
                        fontSize: "9px",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "rgba(0,0,0,0.35)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontFamily: "Montserrat, sans-serif",
                        marginRight: "16px",
                        transition: "color 0.18s",
                        padding: 0,
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#1a1a1a")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "rgba(0,0,0,0.35)")
                      }
                    >
                      Edit
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(row._id)}
                      style={{
                        fontSize: "9px",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "rgba(0,0,0,0.3)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontFamily: "Montserrat, sans-serif",
                        transition: "color 0.18s",
                        padding: 0,
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#c0392b")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "rgba(0,0,0,0.3)")
                      }
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

      {/* Mobile card list */}
      <div className="admin-table-mobile">
        {rows.map((row) => (
          <div
            key={row._id}
            style={{
              borderBottom: "1px solid rgba(0,0,0,0.07)",
              padding: "16px 0",
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            {/* Thumbnail if present */}
            {columns.find(
              (c) => c.key === "imageUrl" || c.key === "coverImage",
            ) &&
              (() => {
                const imgCol = columns.find(
                  (c) => c.key === "imageUrl" || c.key === "coverImage",
                );
                const val = row[imgCol.key];
                return val ? (
                  <img
                    src={val}
                    alt=""
                    style={{
                      width: "48px",
                      height: "48px",
                      objectFit: "cover",
                      flexShrink: 0,
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      background: "rgba(0,0,0,0.06)",
                      flexShrink: 0,
                    }}
                  />
                );
              })()}

            {/* Primary text */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {columns
                .filter((c) => c.key !== "imageUrl" && c.key !== "coverImage")
                .slice(0, 2)
                .map(({ key, render, label }) => (
                  <p
                    key={key}
                    style={{
                      fontSize:
                        key ===
                        columns.filter(
                          (c) => c.key !== "imageUrl" && c.key !== "coverImage",
                        )[0]?.key
                          ? "12px"
                          : "10px",
                      color:
                        key ===
                        columns.filter(
                          (c) => c.key !== "imageUrl" && c.key !== "coverImage",
                        )[0]?.key
                          ? "#1a1a1a"
                          : "rgba(0,0,0,0.4)",
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 300,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      marginBottom: "2px",
                      letterSpacing: "0.03em",
                    }}
                  >
                    {render ? render(row[key], row) : (row[key] ?? "—")}
                  </p>
                ))}
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: "12px", flexShrink: 0 }}>
              {onEdit && (
                <button
                  onClick={() => onEdit(row._id)}
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(0,0,0,0.4)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "Montserrat, sans-serif",
                    padding: 0,
                  }}
                >
                  Edit
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => onDelete(row._id)}
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(0,0,0,0.28)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "Montserrat, sans-serif",
                    padding: 0,
                  }}
                >
                  Del
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .admin-table-mobile { display: none; }
        @media (max-width: 640px) {
          .admin-table-desktop { display: none; }
          .admin-table-mobile { display: block; }
        }
      `}</style>
    </>
  );
};

export default AdminTable;