/**
 * Valida los errores y retorna un arreglo de los mismos.
 * @param {Array} errors 
 * @returns Array con la lista de errores durante la validación de los datos enviados.
 */

const mensajesDeError = (errors=[]) => {
    const errores = errors.map(error => {
        return {
            type: error.type,
            value: error.value,
            path: error.path,
            message: error.message,
        }
    })
    return errores;
}

module.exports = mensajesDeError;