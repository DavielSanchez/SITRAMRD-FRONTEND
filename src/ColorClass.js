//Estas son Clases con responsabilidad unicas para manejar los temas de colores mas ordenados, cada clase tiene un proposito y se puede crear una nueva para un contexto en especifico

// (useBG) Clase Creada para alternar entre el color del fondo de acuerdo al tema seleccionado

export const useBG = (theme) => {
    return theme === 'dark' ? 'bg-[var(--bg-dark)]' : 'bg-[var(--bg-light)]';
  };

  // (useBGForButtons) Clase Creada Para Manejar el color de los botones y cualquier elemento que dependa del BG con los colores principales (Clase mas usada)

  export const useBGForButtons = (theme) => {
    return theme === 'dark' ? 'bg-[var(--primary-orange-color)]' : 'bg-[var(--primary-purple-color)]';
  };

  // (useText) Clase Creada para alternar entre los textos blanco y negro de acuerdo al tema
  
  export const useText = (theme) => {
    return theme === 'dark' ? 'text-[var(--color-dark)]' : 'text-[var(--color-light)]';
  };

  // (usePrimaryColors) Clase Creada Para Elementos de textos, a, headers que usen cualquier color primario (Clase mas usada)

  export const usePrimaryColors = (theme) => {
    return theme === 'dark' ? 'text-[var(--primary-orange-color)]' : 'text-[var(--primary-purple-color)]';
  };

  // (useColorsWithHover) Clase Creada Para Elementos "a" que redireccionan a otra parte de la pagina

  export const useColorsWithHover = (theme) => {
    return theme === 'dark' ? 'text-[var(--primary-orange-color)] hover:border-[var(--primary-orange-color)]' : 'text-[var(--primary-purple-color)] hover:border-[var(--primary-purple-color)]';
  };

  // (useIconColor) Clase Creada para darle color al icono del auth

export const useIconColor = (theme, variant) => {
  if (theme === 'dark') {
    if (variant === 'chevronRight') return 'white';
    return 'var(--primary-orange-color)';
  } else {
    if (variant === 'chevron') return 'black';
    if (variant === 'chevronRight') return 'black';
    if (variant === 'gray') return 'gray';
    return 'var(--primary-purple-color)';
  }
};