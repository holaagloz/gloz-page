import { CoverflowPiece } from '../coverflow/coverflow.model';
export const works = [
  {
    "image": 2,
    "title": "Hamburguesería contenido",
    "short": "Contenido gastronómico",
    "description": "Una producción enfocada en mostrar el producto y transmitir la experiencia del lugar.",
    "role": "Producción de contenido",
    "position": "50% 48%"
  },
  {
    "image": 3,
    "title": "Inauguración hamburguesería",
    "short": "Contenido de evento",
    "description": "Producción de contenido durante la inauguración de un local en Buenos Aires.",
    "role": "Producción y edición",
    "position": "50% 48%"
  },
  {
    "image": 4,
    "title": "Contenido institucional",
    "short": "Contenido institucional",
    "description": "Una pieza institucional para un estudio jurídico de Buenos Aires.",
    "role": "Producción de contenido",
    "position": "50% 45%"
  },
  {
    "image": 1,
    "title": "Idea creativa mundialista · HOT SALE",
    "short": "Campaña HOT SALE",
    "description": "Idea publicitaria, guion, producción y edición con una temática mundialista.",
    "role": "Idea, producción y edición",
    "position": "50% 55%"
  }
] as const;
// Visual reference: event on the left, HOT SALE on the right. Four existing pieces.
export const coverflowOrder = [0, 3, 2, 1] as const;
export const pieces: readonly CoverflowPiece[] = coverflowOrder.map(index => ({
 id: 'work-' + works[index].image, image: 'projects/work-' + works[index].image + '.jpg',
 title: works[index].title, category: works[index].role,
 alt: works[index].title + ', fotograma original', position: works[index].position
}));
