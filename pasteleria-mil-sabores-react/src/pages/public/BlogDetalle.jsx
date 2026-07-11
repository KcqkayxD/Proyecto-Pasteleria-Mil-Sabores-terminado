import { Link, useParams } from 'react-router-dom';
import { getBlogById } from '../../data/blogsData';

export default function BlogDetalle() {
  const { id } = useParams();
  const blog = getBlogById(id);

  if (!blog) {
    return (
      <div className="card p-4">
        <h2>Blog no encontrado</h2>
        <Link to="/blogs">Volver</Link>
      </div>
    );
  }

  return (
    <article className="card p-4">
      <img src={blog.imagen} alt={blog.titulo} className="img-fluid rounded-4 mb-3" />
      <h1>{blog.titulo}</h1>
      <p>{blog.contenido}</p>
      <Link to="/blogs" className="btn btn-outline-secondary align-self-start">
        Volver a Blogs
      </Link>
    </article>
  );
}
