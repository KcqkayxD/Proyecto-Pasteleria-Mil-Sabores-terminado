export default function Nosotros() {
  return (
    <>
      <section className="row align-items-center g-4 mb-5">
        <div className="col-md-5">
          <img
            src="/nosotros.png"
            alt="Historia Pastelería Mil Sabores"
            className="img-fluid rounded-4"
          />
        </div>
        <div className="col-md-7">
          <h1>Nuestra Historia</h1>
          <p>
            Pastelería Mil Sabores nació hace 50 años en Chile con una misión clara: celebrar
            momentos inolvidables a través de recetas artesanales. Nuestra tradición familiar ha
            sido reconocida por su calidad y creatividad, marcando generaciones con tortas y
            postres únicos.
          </p>
        </div>
      </section>

      <section className="row g-4">
        <div className="col-md-6">
          <div className="card p-4 h-100">
            <h2>Misión</h2>
            <p className="mb-0">
              Entregar productos de pastelería de excelencia, personalizados y con ingredientes de
              calidad.
            </p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card p-4 h-100">
            <h2>Visión</h2>
            <p className="mb-0">
              Ser la pastelería líder en Chile por innovación, tradición y cercanía con nuestros
              clientes.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
