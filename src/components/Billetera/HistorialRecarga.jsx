import React, { useState, useEffect } from "react";
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
import { jwtDecode } from "jwt-decode";
import { useBG, useText  } from "../../ColorClass";

const columns = [
  { id: "index", label: "#", minWidth: 50 },
  { id: "monto", label: "Monto", minWidth: 50 },
  { id: "fecha", label: "Fecha", minWidth: 150 },
  { id: "tarjetaVirtual", label: "Tarjeta", minWidth: 150 },
  { id: "estado", label: "Estado", minWidth: 100 },
];

function HistorialRecarga() {
  const [recargas, setRecargas] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;
  const theme = decodedToken.theme;

  const bgColor = useBG(theme);
  const textColor = useText(theme);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_LINK}/wallet/recargas/user/${userId}`
        );
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        const data = await response.json();
        console.log(data)
        setRecargas(data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
    fetchData();
  }, [userId]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleFilter = () => {
    return recargas.filter((row) => {
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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-DO", {
      style: "currency",
      currency: "DOP",
    }).format(amount);
  };

  return (
    <div className="w-full max-w-4xl mb-20">
      <h2 className={` ${textColor} lg:text-3xl mb-4 text-xl font-bold font-['Inter'] mr-10`}>
      Historial de Recargas
        </h2>

      <div className="flex flex-wrap gap-4 mb-6">
        <TextField
          label="Desde"
          type="date"
          color="secondary"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          className="w-full sm:w-48"
        />
        <TextField
          label="Hasta"
          type="date"
          color="secondary"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          className="w-full sm:w-48"
        />
        <Button
          variant="contained"
          onClick={handleFilter}
          sx={{ backgroundColor: "#6a62dc", color: "white" }}
          className="w-full sm:w-auto"
        >
          Filtrar
        </Button>
      </div>

      <Paper sx={{ width: "100%", overflowX: "auto" }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{
                      minWidth: column.minWidth,
                      color: "white",
                      fontWeight: "bold",
                      backgroundColor: "#6a62dc",
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
                .map((row, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      let value;
                      if (column.id === "index") {
                        value = page * rowsPerPage + index + 1;
                      } else if (column.id === "fecha") {
                        value = new Date(row.fecha).toLocaleDateString();
                      } else if (column.id === "monto") {
                        value = formatCurrency(row.monto);
                      }else if (column.id === "tarjetaVirtual"){
                        value = row.nombreTarjeta
                      } else {
                        value = row[column.id];
                      }
                      return (
                        <TableCell key={column.id} style={{ color: "#6a62dc" }}>
                          {column.id === "estado" ? getEstadoIcon(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Paginación */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={handleFilter().length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ backgroundColor: "#6a62dc", color: "white" }}
        />
      </Paper>
    </div>
  );
}

export default HistorialRecarga;
