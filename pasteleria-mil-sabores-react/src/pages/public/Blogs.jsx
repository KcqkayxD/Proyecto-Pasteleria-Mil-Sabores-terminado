import { Link } from 'react-router-dom';
import { getBlogs } from '../../data/blogsData';

export default function Blogs() {
  const blogs = getBlogs();

  return (
    <section>
      <h1 className="mb-4">Blogs</h1>
      <div className="row">
        {blogs.map((blog) => (
          <div key={blog.id} className="col-md-6 mb-4">
            <article className="card h-100">
              <img src={blog.imagen} alt={blog.titulo} className="card-img-top" />
              <div className="card-body d-flex flex-column">
                <h3 className="h5">{blog.titulo}</h3>
                <p className="text-muted flex-grow-1">{blog.descripcion}</p>
                <Link to={`/blogs/${blog.id}`} className="btn btn-primary align-self-start">
                  Leer más
                </Link>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
