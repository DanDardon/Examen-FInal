/*import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Project } from '../types';
import { Calendar, User, Tag, DollarSign, CheckCircle, Clock } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onStatusChange: (id: string) => void;
  onPaymentStatusChange: (id: string) => void;
}

export function ProjectCard({ project, onStatusChange, onPaymentStatusChange }: ProjectCardProps) {
  const priorityColors = {
    baja: 'bg-green-100 text-green-800',
    media: 'bg-yellow-100 text-yellow-800',
    alta: 'bg-red-100 text-red-800'
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-[1.02]">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{project.titulo}</h3>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${priorityColors[project.prioridad]}`}>
            {project.prioridad}
          </span>
        </div>
        
        {project.descripcion && (
          <p className="text-gray-600 mb-4">{project.descripcion}</p>
        )}

        <div className="space-y-2">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Creado: {format(new Date(project.fecha_creacion), 'PP', { locale: es })}</span>
          </div>

          {project.fecha_vencimiento && (
            <div className="flex items-center text-gray-600">
              <Clock className="w-4 h-4 mr-2" />
              <span>Vence: {format(new Date(project.fecha_vencimiento), 'PP', { locale: es })}</span>
            </div>
          )}

          {project.asignado_a && (
            <div className="flex items-center text-gray-600">
              <User className="w-4 h-4 mr-2" />
              <span>{project.asignado_a}</span>
            </div>
          )}

          {project.categoria && (
            <div className="flex items-center text-gray-600">
              <Tag className="w-4 h-4 mr-2" />
              <span>{project.categoria}</span>
            </div>
          )}

          <div className="flex items-center text-gray-600">
            <DollarSign className="w-4 h-4 mr-2" />
            <span>${project.costo_proyecto.toLocaleString()}</span>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={() => onStatusChange(project.id)}
            className={`flex items-center px-4 py-2 rounded-md transition-colors
              ${project.completada 
                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            {project.completada ? 'Completado' : 'Marcar como completado'}
          </button>

          {!project.pagado && (
            <button 
              onClick={() => onPaymentStatusChange(project.id)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Pagar Proyecto
            </button>
          )}
        </div>
      </div>
    </div>
  );
}*/

import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Project } from '../types';
import { Calendar, User, Tag, DollarSign, CheckCircle, Clock } from 'lucide-react';
import { createCheckoutSession } from '../stripeService'; // Importa el servicio de Stripe

interface ProjectCardProps {
  project: Project;
  onStatusChange: (id: string) => void;
  onPaymentStatusChange: (id: string) => void;
}

export function ProjectCard({ project, onStatusChange, onPaymentStatusChange }: ProjectCardProps) {
  const priorityColors = {
    baja: 'bg-green-100 text-green-800',
    media: 'bg-yellow-100 text-yellow-800',
    alta: 'bg-red-100 text-red-800'
  };

  const handlePayment = async () => {
    try {
      await createCheckoutSession(project.costo_proyecto * 100); // Convertir a centavos
      onPaymentStatusChange(project.id); // Actualiza el estado de pago localmente si es necesario
    } catch (error) {
      console.error("Error al procesar el pago:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-[1.02]">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{project.titulo}</h3>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${priorityColors[project.prioridad]}`}>
            {project.prioridad}
          </span>
        </div>

        {project.descripcion && (
          <p className="text-gray-600 mb-4">{project.descripcion}</p>
        )}

        <div className="space-y-2">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Creado: {format(new Date(project.fecha_creacion), 'PP', { locale: es })}</span>
          </div>

          {project.fecha_vencimiento && (
            <div className="flex items-center text-gray-600">
              <Clock className="w-4 h-4 mr-2" />
              <span>Vence: {format(new Date(project.fecha_vencimiento), 'PP', { locale: es })}</span>
            </div>
          )}

          {project.asignado_a && (
            <div className="flex items-center text-gray-600">
              <User className="w-4 h-4 mr-2" />
              <span>{project.asignado_a}</span>
            </div>
          )}

          {project.categoria && (
            <div className="flex items-center text-gray-600">
              <Tag className="w-4 h-4 mr-2" />
              <span>{project.categoria}</span>
            </div>
          )}

          <div className="flex items-center text-gray-600">
            <DollarSign className="w-4 h-4 mr-2" />
            <span>${project.costo_proyecto.toLocaleString()}</span>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={() => onStatusChange(project.id)}
            className={`flex items-center px-4 py-2 rounded-md transition-colors
              ${project.completada 
                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            {project.completada ? 'Completado' : 'Marcar como completado'}
          </button>

          {!project.pagado && (
            <button 
              onClick={handlePayment} // Llama a la función de pago
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Pagar Proyecto
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
