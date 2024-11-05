/*import React, { useState } from 'react';
import { Project, Priority } from '../types';
import { Calendar, DollarSign } from 'lucide-react';

interface ProjectFormProps {
  onSubmit: (project: Omit<Project, 'id' | 'pagado'>) => void;
}

export function ProjectForm({ onSubmit }: ProjectFormProps) {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    fecha_vencimiento: '',
    prioridad: 'media' as Priority,
    asignado_a: '',
    categoria: '',
    costo_proyecto: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      completada: false,
      fecha_creacion: new Date().toISOString(),
    });
    setFormData({
      titulo: '',
      descripcion: '',
      fecha_vencimiento: '',
      prioridad: 'media',
      asignado_a: '',
      categoria: '',
      costo_proyecto: 0
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Nuevo Proyecto</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Título</label>
          <input
            type="text"
            required
            value={formData.titulo}
            onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            value={formData.descripcion}
            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <Calendar className="w-4 h-4 inline mr-1" />
              Fecha de Vencimiento
            </label>
            <input
              type="date"
              value={formData.fecha_vencimiento}
              onChange={(e) => setFormData({ ...formData, fecha_vencimiento: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Prioridad</label>
            <select
              value={formData.prioridad}
              onChange={(e) => setFormData({ ...formData, prioridad: e.target.value as Priority })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="baja">Baja</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Asignado a</label>
            <input
              type="text"
              value={formData.asignado_a}
              onChange={(e) => setFormData({ ...formData, asignado_a: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Categoría</label>
            <input
              type="text"
              value={formData.categoria}
              onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              <DollarSign className="w-4 h-4 inline mr-1" />
              Costo del Proyecto
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={formData.costo_proyecto}
              onChange={(e) => setFormData({ ...formData, costo_proyecto: parseFloat(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors mt-6"
        >
          Crear Proyecto
        </button>
      </div>
    </form>
  );
}*/

import React, { useState } from 'react';
import { Project, Priority } from '../types';
import { Calendar, DollarSign } from 'lucide-react';

interface ProjectFormProps {
  onSubmit: (project: Omit<Project, 'id' | 'pagado'>) => void;
}

export function ProjectForm({ onSubmit }: ProjectFormProps) {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    fecha_vencimiento: '',
    prioridad: 'media' as Priority,
    asignado_a: '',
    categoria: '',
    costo_proyecto: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar la fecha de vencimiento
    if (formData.fecha_vencimiento && isNaN(new Date(formData.fecha_vencimiento).getTime())) {
      console.error("Fecha de vencimiento no válida");
      return;
    }

    // Convertir fecha_vencimiento a formato ISO-8601
    const fechaVencimientoISO = formData.fecha_vencimiento ? new Date(formData.fecha_vencimiento).toISOString() : null;

    onSubmit({
      ...formData,
      completada: false,
      fecha_creacion: new Date().toISOString(),
      fecha_vencimiento: fechaVencimientoISO,
    });

    setFormData({
      titulo: '',
      descripcion: '',
      fecha_vencimiento: '',
      prioridad: 'media',
      asignado_a: '',
      categoria: '',
      costo_proyecto: 0
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Nuevo Proyecto</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Título</label>
          <input
            type="text"
            required
            value={formData.titulo}
            onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            value={formData.descripcion}
            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <Calendar className="w-4 h-4 inline mr-1" />
              Fecha de Vencimiento
            </label>
            <input
              type="date"
              value={formData.fecha_vencimiento}
              onChange={(e) => setFormData({ ...formData, fecha_vencimiento: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Prioridad</label>
            <select
              value={formData.prioridad}
              onChange={(e) => setFormData({ ...formData, prioridad: e.target.value as Priority })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="baja">Baja</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Asignado a</label>
            <input
              type="text"
              value={formData.asignado_a}
              onChange={(e) => setFormData({ ...formData, asignado_a: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Categoría</label>
            <input
              type="text"
              value={formData.categoria}
              onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              <DollarSign className="w-4 h-4 inline mr-1" />
              Costo del Proyecto
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={formData.costo_proyecto}
              onChange={(e) => setFormData({ ...formData, costo_proyecto: parseFloat(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors mt-6"
        >
          Crear Proyecto
        </button>
      </div>
    </form>
  );
}
