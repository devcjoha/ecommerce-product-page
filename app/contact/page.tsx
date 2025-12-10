"use client";
import HomeIcon from "@/src/components/icons/HomeIcon";
import Link from "next/link";

export default function Contact() {
  return (
    <section className="flex flex-col items-center justify-center py-16 px-6 bg-white">
      <h2 className="text-3xl font-bold text-orange-500 mb-6">Contact</h2>

      <ul className="space-y-4 text-center">
        <li>
          <a
            href="https://github.com/devcjoha"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-orange-500 transition-colors"
          >
            🌐 Website - <span className="font-semibold">Carla Johanna</span>
          </a>
        </li>

        <li>
          <a
            href="https://www.frontendmentor.io/profile/devcjoha"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-orange-500 transition-colors"
          >
            💻 Frontend Mentor - <span className="font-semibold">@devcjoha</span>
          </a>
        </li>

        <li>
          <a
            href="https://www.x.com/carlitajohana"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-orange-500 transition-colors"
          >
            🐦 X - <span className="font-semibold">@CarlitaJohanna</span>
          </a>
        </li>
      </ul>
        <Link href={"/"} className="flex flex-col items-center justify-center mt-15">
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
}