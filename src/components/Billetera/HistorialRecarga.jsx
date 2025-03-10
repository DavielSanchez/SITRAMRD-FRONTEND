import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { TextField, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CancelIcon from "@mui/icons-material/Cancel";

const columns = [
  { id: "id", label: "#", minWidth: 100 },
  { id: "monto", label: "Monto", minWidth: 100 },
  { id: "metodo", label: "Método", minWidth: 150 },
  { id: "fecha", label: "Fecha", minWidth: 150 },
  { id: "tarjeta", label: "Tarjeta", minWidth: 150 },
  { id: "estado", label: "Estado", minWidth: 100 },
  { id: "acciones", label: "Acciones", minWidth: 100 },
];

function createData(id, monto, metodo, fecha, tarjeta, estado) {
  return { id, monto, metodo, fecha, tarjeta, estado };
}

const rows = [
  createData(1, "RD$500", "Tarjeta", "2025-03-01", "Visa 1234", "Completado"),
  createData(2, "RD$1500", "Efectivo", "2025-03-02", "-", "Pendiente"),
  createData(
    3,
    "RD$2000",
    "Tarjeta",
    "2025-03-03",
    "Mastercard 5678",
    "Fallido"
  ),
  createData(4, "RD$1200", "Efectivo", "2025-03-04", "-", "Completado"),
  createData(5, "RD$800", "Tarjeta", "2025-03-05", "Visa 4321", "Pendiente"),
];

function HistorialRecarga() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleFilter = () => {
    return rows.filter((row) => {
      const rowDate = new Date(row.fecha);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      if (start && rowDate < start) return false;
      if (end && rowDate > end) return false;
      return true;
    });
  };

  const getEstadoIcon = (estado) => {
    switch (estado) {
      case "Completado":
        return (
          <div className="flex items-center text-green-500">
            <CheckCircleIcon sx={{ marginRight: "5px", color: "green" }} />
            Completado
          </div>
        );
      case "Pendiente":
        return (
          <div className="flex items-center text-yellow-500">
            <AccessTimeIcon sx={{ marginRight: "5px", color: "yellow" }} />
            Pendiente
          </div>
        );
      case "Fallido":
        return (
          <div className="flex items-center text-red-500">
            <CancelIcon sx={{ marginRight: "5px", color: "red" }} />
            Fallido
          </div>
        );
      default:
        return estado;
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-10">
        <h2 className="text-black text-3xl font-bold font-['Inter'] mr-10">
          Historial de Recargas
        </h2>
      </div>

      {/* Filtros de fecha */}
      <div className="flex gap-4 mb-6">
        <TextField
          label="Desde"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Hasta"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button
          variant="contained"
          onClick={handleFilter}
          sx={{
            backgroundColor: "#6a62dc", // Color morado
            color: "white", // Texto blanco
          }}
        >
          Filtrar
        </Button>
      </div>

      {/* Tabla de Recargas */}
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      color: "white", // Texto blanco
                      fontWeight: "bold", // Para hacerlo más destacado
                      borderBottom: "2px solid #6a62dc", // Borde inferior morado para la fila
                      backgroundColor: "#6a62dc", // Aseguramos que no haya fondo por defecto
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {handleFilter()
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            color: "#6a62dc", // Color morado para los datos
                          }}
                        >
                          {column.id === "acciones" ? (
                            <VisibilityIcon sx={{ color: "#6a62dc" }} />
                          ) : column.id === "estado" ? (
                            getEstadoIcon(value)
                          ) : column.id === "monto" ? (
                            <span>{value}</span>
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Paginación de la tabla */}
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={handleFilter().length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            backgroundColor: "#6a62dc", // Color morado
            color: "white", // Texto blanco
          }}
        />
      </Paper>
    </div>
  );
}

export default HistorialRecarga;
