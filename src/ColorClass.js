//Aqui son clases de acuerdo a los colores para manejar los temas

//Clase Creada para alternar entre el color del fondo

export const useBG = (theme) => {
    return theme === 'dark' ? 'bg-[var(--bg-dark)]' : 'bg-[var(--bg-light)]';
  };

  //Clase Creada para alternar entre los textos blanco y negro
  
  export const useText = (theme) => {
    return theme === 'dark' ? 'text-[var(--color-dark)]' : 'text-[var(--color-light)]';
  };

  //Clase Creada Para Elementos que usen cualquier color primario (esta seria la mas usada)

  export const usePrimaryColors = (theme) => {
    return theme === 'dark' ? 'text-[var(--primary-orange-color)]' : 'text-[var(--primary-purple-color)]';
  };

  //Clase Creada Para Elementos "a" que redireccionan a otra parte de la pagina

  export const useColorsWithHover = (theme) => {
    return theme === 'dark' ? 'text-[var(--primary-orange-color)] hover:border-[var(--primary-orange-color)]' : 'text-[var(--primary-purple-color)] hover:border-[var(--primary-purple-color)]';
  };

  // Este codigo estaba en el auth asi que lo pase para aca y asi manejar el color de los iconos en esta clase

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
