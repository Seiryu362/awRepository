const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const dataPath = path.join(__dirname, '../data/events.json');

// Obtener todos los eventos
router.get('/', (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath));
  res.json(data);
});

// Obtener evento por ID
router.get('/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath));
  const evento = data.find(function (e) {
    return e.id === parseInt(req.params.id);
  });
  if (evento) {
    res.json(evento);
  } else {
    res.status(404).json({ msg: 'No encontrado' });
  }
});

// Crear nuevo evento
router.post('/', (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath));
  const nuevo = {
    id: Date.now(),
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    fecha: req.body.fecha
  };
  data.push(nuevo);
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  res.status(201).json(nuevo);
});

// Actualizar un evento existente
router.put('/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath));
  const index = data.findIndex(function (e) {
    return e.id === parseInt(req.params.id);
  });

  if (index === -1) {
    return res.status(404).json({ msg: 'No encontrado' });
  }

  data[index] = Object.assign(data[index], req.body);
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  res.json(data[index]);
});

// Eliminar evento
router.delete('/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath));
  const nuevoData = data.filter(function (e) {
    return e.id !== parseInt(req.params.id);
  });

  if (nuevoData.length === data.length) {
    return res.status(404).json({ msg: 'No encontrado' });
  }

  fs.writeFileSync(dataPath, JSON.stringify(nuevoData, null, 2));
  res.json({ msg: 'Evento eliminado' });
});

module.exports = router;
// Este archivo define las rutas para manejar eventos en una API RESTful.
// Permite obtener, crear, actualizar y eliminar eventos almacenados en un archivo JSON.
// Utiliza el módulo 'fs' para leer y escribir en el sistema de archivos, y 'path' para manejar rutas de archivos.
// Las rutas están organizadas bajo el prefijo '/api/eventos' y responden a diferentes métodos HTTP:
// - GET /: Obtiene todos los eventos.