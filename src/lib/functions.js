const calculateTime = (mongoTimestamp) => {
    const now = new Date();
    const timestamp = new Date(mongoTimestamp); // Convertir el timestamp de Mongo a un objeto Date
    const diffInMs = now - timestamp; // Diferencia en milisegundos

    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInSeconds < 60) {
        return `hace ${diffInSeconds} segundo${diffInSeconds !== 1 ? 's' : ''}`;
    } else if (diffInMinutes < 60) {
        return `hace ${diffInMinutes} minuto${diffInMinutes !== 1 ? 's' : ''}`;
    } else if (diffInHours < 24) {
        return `hace ${diffInHours} hora${diffInHours !== 1 ? 's' : ''}`;
    } else if (diffInDays < 30) {
        return `hace ${diffInDays} día${diffInDays !== 1 ? 's' : ''}`;
    } else {
        const diffInMonths = Math.floor(diffInDays / 30);
        if (diffInMonths < 12) {
            return `hace ${diffInMonths} mes${diffInMonths !== 1 ? 'es' : ''}`;
        } else {
            const diffInYears = Math.floor(diffInMonths / 12);
            return `hace ${diffInYears} año${diffInYears !== 1 ? 's' : ''}`;
        }
    }
};

export { calculateTime }