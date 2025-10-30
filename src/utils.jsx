/**
 * Formatea un objeto Date a un string 'yyyy-mm-dd'.
 * @param {Date} date - El objeto Date a formatear.
 * @returns {string} - La fecha en formato 'yyyy-mm-dd'.
 */
export const formatDate = (date) => {
    const year = date.getFullYear();
    // getMonth() es 0-indexado (0=Ene, 1=Feb, ...), por eso sumamos 1.
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Obtiene las fechas clave de Semana Santa para un año específico.
 * * @param {number} year - El año para el cual calcular las fechas (ej. 2024).
 * @returns {object} - Un objeto con las fechas en formato 'yyyy-mm-dd'.
 * { juevesSanto: 'yyyy-mm-dd', 
 * viernesSanto: 'yyyy-mm-dd', 
 * domingoPascua: 'yyyy-mm-dd' }
 */
export const calcularSemanaSanta = (year) => {// 1. Calcular el Domingo de Pascua (Algoritmo de Meeus/Jones/Butcher)
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    
    // Mes (3 = Marzo, 4 = Abril). Se resta 1 porque los meses en Date() son 0-indexados.
    const month = Math.floor((h + l - 7 * m + 114) / 31) - 1; 
    const day = ((h + l - 7 * m + 114) % 31) + 1;

    // 2. Crear el objeto Date para el Domingo de Pascua
    const domingoPascua = new Date(year, month, day);

    // 3. Calcular las otras fechas restando días
    // Usamos setDate() que maneja correctamente los cambios de mes/año
    
    // Viernes Santo (Pascua - 2 días)
    const viernesSanto = new Date(domingoPascua);
    viernesSanto.setDate(domingoPascua.getDate() - 2);

    // Jueves Santo (Pascua - 3 días)
    const juevesSanto = new Date(domingoPascua);
    juevesSanto.setDate(domingoPascua.getDate() - 3);

    // 4. Formatear y retornar el objeto
    return {
        juevesSanto: (juevesSanto),
        viernesSanto: (viernesSanto),
        domingoPascua: (domingoPascua)
    };
}