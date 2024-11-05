/*import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// Get all projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { fecha_creacion: 'desc' },
    });
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);  // Log the error
    res.status(500).json({ error: 'Error al obtener los proyectos' });
  }
});

// Create a new project
app.post('/api/projects', async (req, res) => {
  try {
    const project = await prisma.project.create({
      data: {
        ...req.body,
        prioridad: req.body.prioridad.toUpperCase(),
      },
    });
    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error);  // Log the error
    res.status(500).json({ error: 'Error al crear el proyecto' });
  }
});

// Update a project
app.patch('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const project = await prisma.project.update({
      where: { id },
      data: {
        ...req.body,
        prioridad: req.body.prioridad?.toUpperCase(),
      },
    });
    res.json(project);
  } catch (error) {
    console.error('Error updating project:', error);  // Log the error
    res.status(500).json({ error: 'Error al actualizar el proyecto' });
  }
});

// Delete a project
app.delete('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.project.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting project:', error);  // Log the error
    res.status(500).json({ error: 'Error al eliminar el proyecto' });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});*/

import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import Stripe from 'stripe';

dotenv.config();

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Asegúrate de tener la clave secreta en tu archivo .env
const app = express();

app.use(cors());
app.use(express.json());

// Get all projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { fecha_creacion: 'desc' },
    });
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Error al obtener los proyectos' });
  }
});

// Create a new project
app.post('/api/projects', async (req, res) => {
  try {
    const project = await prisma.project.create({
      data: {
        ...req.body,
        prioridad: req.body.prioridad.toUpperCase(),
      },
    });
    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Error al crear el proyecto' });
  }
});

// Update a project
app.patch('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const project = await prisma.project.update({
      where: { id },
      data: {
        ...req.body,
        prioridad: req.body.prioridad?.toUpperCase(),
      },
    });
    res.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Error al actualizar el proyecto' });
  }
});

// Delete a project
app.delete('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.project.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Error al eliminar el proyecto' });
  }
});

// Create a payment session with Stripe
app.post('/api/create-checkout-session', async (req, res) => {
  const { amount } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Pago por Proyecto',
            },
            unit_amount: amount, // Asegúrate de que este valor esté en centavos
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success', // Cambia según tu ruta de éxito
      cancel_url: 'http://localhost:3000/cancel', // Cambia según tu ruta de cancelación
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    res.status(500).json({ error: 'Error al crear la sesión de pago' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
