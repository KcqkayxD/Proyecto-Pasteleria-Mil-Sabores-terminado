const blogs = [
  {
    id: '1',
    titulo: '5 Tips para elegir la torta perfecta',
    descripcion: 'Guía práctica para escoger la torta ideal según la ocasión.',
    imagen: 'https://picsum.photos/seed/blog1/700/380',
    contenido:
      'Elegir la torta ideal depende del número de invitados, tipo de celebración y preferencias de sabor. Considera sabores clásicos, opciones sin azúcar y personalización de mensajes.'
  },
  {
    id: '2',
    titulo: 'Historia de la pastelería chilena tradicional',
    descripcion: 'Un recorrido por sabores icónicos y recetas con tradición.',
    imagen: 'https://picsum.photos/seed/blog2/700/380',
    contenido:
      'La pastelería chilena mezcla herencia europea con ingredientes locales. Desde tartas y empanadas dulces hasta tortas de cumpleaños, la tradición sigue viva en cada receta.'
  }
];

export function getBlogs() {
  return blogs;
}

export function getBlogById(id) {
  return blogs.find((b) => b.id === id) || null;
}

export default blogs;
