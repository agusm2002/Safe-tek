const express = require('express');
const { Pool } = require('pg');
const app = express();

// Configuración de la conexión usando los nombres del docker-compose
const pool = new Pool({
  host: 'db', // ¡Docker resuelve esto a la IP del contenedor de Postgres!
  user: 'admin',
  password: 'admin',
  database: 'mi_app_db',
  port: 5432,
});

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW() as la_hora_en_la_db');
    res.json({ 
      mensaje: "¡Hola desde el Backend en Docker V3!",
      db_status: "Conectada",
      hora_servidor: result.rows[0].la_hora_en_la_db 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('API lista en puerto 3000'));