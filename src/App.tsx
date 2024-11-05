import React, { useState } from 'react';
import { ProjectCard } from './components/ProjectCard';
import { ProjectForm } from './components/ProjectForm';
import { Layout, Plus, X, RefreshCw, AlertCircle } from 'lucide-react';
import { useProjects } from './hooks/useProjects';

function App() {
  const [showForm, setShowForm] = useState(false);
  const {
    projects,
    loading,
    error,
    addProject,
    updateProjectStatus,
    updatePaymentStatus,
    refreshProjects
  } = useProjects();

  const handleNewProject = async (projectData: Omit<Project, 'id' | 'pagado'>) => {
    try {
      await addProject(projectData);
      setShowForm(false);
    } catch (err) {
      // Error is handled by useProjects hook
    }
  };

  const handleStatusChange = async (id: string) => {
    const project = projects.find(p => p.id === id);
    if (project) {
      try {
        await updateProjectStatus(id, !project.completada);
      } catch (err) {
        // Error is handled by useProjects hook
      }
    }
  };

  const handlePaymentStatus = async (id: string) => {
    const project = projects.find(p => p.id === id);
    if (project) {
      try {
        await updatePaymentStatus(id, true);
      } catch (err) {
        // Error is handled by useProjects hook
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Layout className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">Gestión de Proyectos</h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={refreshProjects}
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                title="Actualizar proyectos"
              >
                <RefreshCw className="h-5 w-5" />
              </button>
              <button
                onClick={() => setShowForm(!showForm)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                {showForm ? (
                  <>
                    <X className="h-5 w-5 mr-2" />
                    Cancelar
                  </>
                ) : (
                  <>
                    <Plus className="h-5 w-5 mr-2" />
                    Nuevo Proyecto
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-center text-red-700">
            <AlertCircle className="h-5 w-5 mr-2" />
            <p>{error}</p>
          </div>
        )}

        {showForm && (
          <div className="mb-8">
            <ProjectForm onSubmit={handleNewProject} />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : projects.length > 0 ? (
            projects.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                onStatusChange={handleStatusChange}
                onPaymentStatusChange={handlePaymentStatus}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">
                No hay proyectos aún. ¡Crea uno nuevo!
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;