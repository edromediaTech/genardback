const mongoose = require('mongoose');
const Service = require('../models/service');

// Créer un nouveau service
exports.createService = async (req, res) => {
  try {
    const { name, description, category, price, duration, capacity, images } = req.body;

    // Vérifier si le service existe déjà
    const existingService = await Service.findOne({ name });
    if (existingService) {
      return res.status(400).json({ message: 'Ce service existe déjà.' });
    }

    const newService = new Service({
      name,
      description,
      category,
      price,
      duration,
      capacity,
      images
    });

    await newService.save();
    res.status(201).json({ message: 'Service créé avec succès.', service: newService });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du service.', error });
  }
};

// Récupérer tous les services
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json({ message: 'Liste des services récupérée avec succès.', services });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des services.', error });
  }
};

// Récupérer un service par ID
exports.getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ message: 'Service non trouvé.' });
    }
    res.status(200).json({ message: 'Service récupéré avec succès.', service });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du service.', error });
  }
};

// Mettre à jour un service
exports.updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Vérifier si le service existe
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ message: 'Service non trouvé.' });
    }

    // Mettre à jour les champs
    Object.assign(service, updates);
    await service.save();
    res.status(200).json({ message: 'Service mis à jour avec succès.', service });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du service.', error });
  }
};

// Supprimer un service
exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndDelete(id);
    if (!service) {
      return res.status(404).json({ message: 'Service non trouvé.' });
    }
    res.status(200).json({ message: 'Service supprimé avec succès.', service });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du service.', error });
  }
};