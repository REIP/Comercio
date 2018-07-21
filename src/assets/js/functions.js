/**
 * Validar que el texto ingresado sea de tipo numerico.
 * @param {Event} event
 * @return {Number}
 */
function validateNumber(event) {
    keyValue = (document.all) ? event.keyCode : event.which;
    if (keyValue == 8) {
        return true;
    }
    pattern = /^([0-9])*$/;
    keyFinal = String.fromCharCode(keyValue);
    return pattern.test(keyFinal);
}

/**
 * Insertar los valores numericos en la tabla.
 */
function insertValueIntoTable() {
    if (!existsValueIntoTable()) {
        var names = document.getElementsByName('numero[]');
        var TableRow = "<tr></tr>";
        for (key = 0; key < names.length; key++)
            TableRow = TableRow.substring(0, TableRow.length - 5) + "<td>" + names[key].value + "</td>" + TableRow.substring(TableRow.length - 5);

        var TrElement = document.createElement("tr");
        TrElement.innerHTML = TableRow;
        document.getElementById("TableBody").appendChild(TrElement);
        document.getElementById("number").value = "";
    }
}

/**
 * Validar si existe el valor en la tabla.
 * @return {Boolean} true, se encontro el valor en la tabla.
 */
function existsValueIntoTable() {
    var tBodyId = document.getElementById('TableBody');
    var searchNumber = document.getElementsByName('numero[]')[0].value;
    var cellsOfRow = "";
    var found = false;
    for (var i = 0; i < tBodyId.rows.length; i++) {
        cellsOfRow = tBodyId.rows[i].getElementsByTagName('td');
        found = false;
        for (var j = 0; j < cellsOfRow.length && !found; j++) {
            number = cellsOfRow[j].innerHTML;
            if (number === searchNumber) {
                found = true;
            }
        }
        if (found) {
            return true;
        }
    }
}

/**
 * Ordernar y mostar los valores de la tabla 
 * de forma ascendentemente.
 */
function sort() {
    var tBodyId = document.getElementById('TableBody');
    var arrayNumbers = [];
    var t;
    for (var i = 0; i < tBodyId.rows.length; i++) {
        cellsOfRow = tBodyId.rows[i].getElementsByTagName('td');
        number = cellsOfRow[0].innerHTML;
        arrayNumbers.push(number);
    }

    var arrayNumbersSort = sortNumbers(arrayNumbers);

    for (var i = 0; i < tBodyId.rows.length; i++) {
        cellsOfRow = tBodyId.rows[i].getElementsByTagName('td');
        for (var j = 0; j < cellsOfRow.length; j++) {
            cellsOfRow[j].innerHTML = arrayNumbersSort[i];
        }
    }
}

/**
 * Ordernar ascendentemente los valores del arreglo usando el motodo burbuja.
 * @param {Array} arrayNumbers, recibe el arreglo como se muestra en la tabla.
 * @return {Array} arrayNumbers, retorna el arreglo orderano.
 */
function sortNumbers(arrayNumbers) {
    for (var a = 0; a < arrayNumbers.length; a++) {
        for (var b = arrayNumbers.length - 1; b >= a; b--) {
            if (parseInt(arrayNumbers[b - 1]) > parseInt(arrayNumbers[b])) {
                t = arrayNumbers[b - 1];
                arrayNumbers[b - 1] = arrayNumbers[b];
                arrayNumbers[b] = t;
            }
        }
    }
    return arrayNumbers;
}

/**
 * Limpiar todos los ementos agregados en la tabla.
 */
function removeAll() {
    var tBodyId = document.getElementById('TableBody');
    while (tBodyId.rows.length > 0) {
        tBodyId.removeChild(tBodyId.rows[0]);
    }
}