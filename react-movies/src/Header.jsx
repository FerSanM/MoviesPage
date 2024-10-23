export function Header() {
  return (
    <section className="">
      <div className="flex justify-center items-center mt-16">
        <h2 className="absolute z-10 text-5xl font-bold text-white">
          Las Mejores Peliculas y Series del Momento
        </h2>
        <img
          className="object-cover object-top h-[450px] w-full"
          src="/img/header.jpg"
          alt="header"
        />
        <img
          className="object-cover absolute z-1 object-top h-[450px] w-full opacity-40"
          src="/img/D13.png"
          alt="gradient"
        />
      </div>
    </section>
  );
}
