const express = require('express');
const fs = require('fs');
const path = require('path');
const { title } = require('process');
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
    res.status(404).json({ msg: 'Not found' });
  }
});

// Crear nuevo evento
router.post('/', (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath));
  const newEvent = {
    id: req.body.id, 
    title: req.body.title,
    description: req.body.description,
    date: req.body.date
  };
  data.push(newEvent);
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  res.status(201).json(newEvent);
});


// Actualizar un evento existente
router.put('/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath));
  const index = data.findIndex(function (e) {
    return e.id === req.params.id; 
  });

  if (index === -1) {
    return res.status(404).json({ msg: 'Not Found' });
  }

  data[index] = Object.assign(data[index], req.body);
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  res.json(data[index]);
});

// Eliminar evento
router.delete('/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath));
  const id = req.params.id;

  const updatedData = data.filter(e => e.id !== id);

  if (updatedData.length === data.length) {
    return res.status(404).json({ msg: 'Not found' });
  }

  fs.writeFileSync(dataPath, JSON.stringify(updatedData, null, 2));
  res.json({ msg: 'Deleted Event' });
});


module.exports = router;
// Este archivo define las rutas para manejar eventos en una API RESTful.
// Permite obtener, crear, actualizar y eliminar eventos almacenados en un archivo JSON.
// Utiliza el módulo 'fs' para leer y escribir en el sistema de archivos, y 'path' para manejar rutas de archivos.
// Las rutas están organizadas bajo el prefijo '/api/eventos' y responden a diferentes métodos HTTP:
// - GET /: Obtiene todos los eventos.