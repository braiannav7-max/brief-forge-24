// Las 5 empresas del grupo que administra la agencia.
//
// `slug` coincide con el id de los proyectos en mock-data.ts (así el briefing
// y el CRM hablan de la misma empresa). `token` es el link privado que se le
// envía a la agencia: entra por /briefing/<token> sin contraseña.
//
// Para reutilizar el núcleo en otro cliente, editás solo este archivo.
// Generá tokens difíciles de adivinar con: openssl rand -hex 8

export interface Company {
  slug: string;
  token: string;
  name: string;
  initials: string;
  tagline: string;
}

export const companies: Company[] = [
  { slug: "bah-gastronomia", token: "bah-7f3a9c2b", name: "BAH Gastronomía", initials: "BAH", tagline: "Definí la identidad, contenidos y objetivos comerciales de BAH." },
  { slug: "movida-buzios", token: "movida-2b8e1d04", name: "Movida Búzios", initials: "M", tagline: "Ordená la experiencia nocturna, reservas y presencia digital." },
  { slug: "silk-beach-club", token: "silk-c4d0a5f1", name: "Silk Beach Club", initials: "silk", tagline: "Documentá el universo visual, gastronómico y comercial de Silk." },
  { slug: "buda-beach-buzios", token: "buda-9a61f2e7", name: "Buda Beach Búzios", initials: "BB", tagline: "Convertí la propuesta del lounge en una experiencia web clara." },
  { slug: "buzios-gastro-group", token: "gastro-e30b7c5a", name: "Búzios Gastro Group", initials: "B", tagline: "Definí la arquitectura corporativa del grupo." },
  { slug: "mondo-khan", token: "mondo-6a42e9b1", name: "Mondo Khan", initials: "MK", tagline: "Estructurá una experiencia editorial para arte y cultura." },
];

export function getCompanyByToken(token: string): Company | undefined {
  return companies.find((c) => c.token === token);
}

export function getCompanyBySlug(slug: string): Company | undefined {
  return companies.find((c) => c.slug === slug);
}
