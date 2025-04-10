import { create } from 'zustand';

const useActividadStore = create((set) => ({
  actividades: [],
  agregarActividad: (nuevaActividad) =>
    set((state) => ({
      actividades: [...state.actividades, nuevaActividad],
    })),
  limpiarActividades: () => set({ actividades: [] }),
}));

export default useActividadStore;
