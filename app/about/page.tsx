"use client";
import favicon from "@/app/favicon.ico";
import Image from "next/image";
import HomeIcon from "@/src/components/icons/HomeIcon";
import Link from "next/link";
export default function About() {
  return (
    <section className="flex flex-col items-center justify-center py-16 px-6 bg-white gap-5">
      <Image
        src={favicon}
        alt="icon-delete"
        width={100}
        height={100}
        className=" h-12 w-12 object-cover mb-6" />
      <h2 className="text-3xl font-bold text-orange-500 mb-6">About Me</h2>

      <div className="max-w-2xl text-center space-y-4">
        <p className="text-gray-700 leading-relaxed">
          Hola, soy <span className="font-semibold">CarlaJoha</span>, desarrolladora Frontend,
          <span className="text-orange-500"> React/NextJS, Vite, Tailwind...</span> {" "}
          Me apasiona construir proyectos con una arquitectura robusta, componentes reutilizables y
          una experiencia de usuario elegante y accesible.
        </p>

        <p className="text-gray-700 leading-relaxed">
          En este ecommerce demuestro cómo organizo el estado con context,
          implemento paginación real desde la API y diseño interfaces claras
          que transmiten profesionalismo.
          Cada detalle está pensado para ser mantenible y escalable.
        </p>

        <p className="text-gray-700 leading-relaxed">
          Mi objetivo es mostrar mi evolución técnica y mi capacidad
          para resolver problemas complejos con soluciones limpias y documentadas.
        </p>
      </div>

        <Link href={"/"} className="flex flex-col items-center justify-center">
          <HomeIcon
            alt="home-icon"
            width={100}
            height={100}
            loading="eager"
            className="link-home w-5 h-5 text-orange" />
        <span>Home</span>
        </Link>
 
    </section>
  );
};