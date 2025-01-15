import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../lib/apis';

const RastrearRutas = () => {
  const location = useLocation();

  // Guardar la ruta actual en el almacenamiento local
  const guardarEnCache = (ruta) => {
    const cache = JSON.parse(localStorage.getItem('visitas')) || [];
    cache.push(ruta);
    localStorage.setItem('visitas', JSON.stringify(cache));
  };

  // Enviar las visitas almacenadas al servidor
  const enviarVisitas = async () => {
    const cache = JSON.parse(localStorage.getItem('visitas')) || [];
    if (cache.length > 0) {
      try {
        console.log("Enviando datos al servidor:", cache);
        await axios.post(`${API_URL}/visitas`, { visitas: cache });
        localStorage.removeItem('visitas');
        console.log("Datos enviados correctamente");
      } catch (error) {
        console.error("Error al enviar los datos:", error);
      }
    } else {
      console.log("No hay datos en la caché para enviar");
    }
  };

  useEffect(() => {
    
    guardarEnCache({
      ruta: location.pathname,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
    });


    const intervalId = setInterval(() => {
      enviarVisitas();
    }, 5000);

 
    return () => {
      clearInterval(intervalId);
    };
  }, [location.pathname]);  

  return null; // Este componente no renderiza nada
};

export default RastrearRutas;
