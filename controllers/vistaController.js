const path = require('path');

const renderizarAppMap = (req, res) => {
    // Busca el archivo HTML y lo envía directamente al cliente
    res.sendFile(path.join(__dirname, '../views/tubus-app.html'));
};

module.exports = {
    renderizarAppMap
};