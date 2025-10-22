import { useEffect, useState } from "react";
import socket from "./Needed/socketService";
import LaravelSession from "../Utils/LaravelSession";
import Global from "../Utils/Global";

const useWebSocket = (filters = {}) => {
  const [wsActive, setWsActive] = useState(false);

  const defaultFilters = {
    environment: Global.APP_ENV,
    restaurant_id: LaravelSession.restaurant_id
  };

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    socket.on("connect", () => {
      socket.emit("register_filters", {
        ...defaultFilters,
        ...filters,
      });
    });

    socket.on("filters_registered", ({ service, filters }) => {
      setWsActive(true);
      console.log(`✅ Conectado a eventos de ${service}`);
      const filtersArray = Object.entries(filters).map(([key, value]) => ({ Filtro: key, Valor: value }));
      console.table(filtersArray);
    });

    socket.on("error", (error) => {
      console.error("❌ Error:", error);
    });

    socket.on("disconnect", () => setWsActive(false));

    return () => {
      socket.off("filters_registered");
      socket.off("error");
      socket.off("disconnect");
      socket.off("connect");
    };
  }, []);

  // ✅ Este solo reacciona si cambian los filtros dinámicos
  useEffect(() => {
    if (socket.connected) {
      socket.emit("update_filters", {
        ...defaultFilters,
        ...filters,
      });
    }
  }, [filters]);

  return { wsActive, socket };
};

export default useWebSocket;
