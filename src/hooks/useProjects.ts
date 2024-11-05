import { useState, useEffect } from 'react';
import { Project } from '../types';
import * as api from '../services/api';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    try {
      setLoading(true);
      const data = await api.fetchProjects();
      setProjects(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar los proyectos');
    } finally {
      setLoading(false);
    }
  }

  async function addProject(projectData: Omit<Project, 'id' | 'pagado'>) {
    try {
      const newProject = await api.createProject({ ...projectData, pagado: false });
      setProjects([...projects, newProject]);
      return newProject;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear el proyecto');
      throw err;
    }
  }

  async function updateProjectStatus(id: string, completada: boolean) {
    try {
      const updatedProject = await api.updateProject(id, { completada });
      setProjects(projects.map(p => p.id === id ? { ...p, completada } : p));
      return updatedProject;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar el estado del proyecto');
      throw err;
    }
  }

  async function updatePaymentStatus(id: string, pagado: boolean) {
    try {
      const updatedProject = await api.updateProject(id, { pagado });
      setProjects(projects.map(p => p.id === id ? { ...p, pagado } : p));
      return updatedProject;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar el estado de pago');
      throw err;
    }
  }

  return {
    projects,
    loading,
    error,
    addProject,
    updateProjectStatus,
    updatePaymentStatus,
    refreshProjects: loadProjects,
  };
}