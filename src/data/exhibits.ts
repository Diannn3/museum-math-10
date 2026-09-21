export type ExhibitKind = "static" | "interactive";

export interface Exhibit {
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  artist: string;
  medium: string;
  summary: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  alt: string;
  kind: ExhibitKind;
  processImage?: string;
  processWidth?: number;
  processHeight?: number;
  processAlt?: string;
  interactiveUrl?: string;
  externalRepository?: string;
}

export const exhibits: Exhibit[] = [
  {
    slug: "desmos-flower",
    number: "01",
    title: "Desmos Flower",
    subtitle: "Mathematics in Nature",
    artist: "Artist to be confirmed",
    medium: "Desmos · mathematical graphing",
    summary: "A flower-like composition built from mathematical curves and repeated radial structure. The work uses symmetry and patterned repetition to turn equations into a botanical form.",
    image: "/artworks/desmos-flower.jpg",
    imageWidth: 1194,
    imageHeight: 1207,
    alt: "A stylized flower with pale orange petals, a dense orange-and-green circular center, and a curved green stem on a white background.",
    kind: "static",
    processImage: "/artworks/desmos-flower-process.jpg",
    processWidth: 719,
    processHeight: 996,
    processAlt: "A Desmos graphing interface showing equations and parameters used to construct the flower artwork."
  },
  {
    slug: "geometric-portrait",
    number: "02",
    title: "Geometric Portrait",
    subtitle: "Form, Light, and Structure",
    artist: "Artist to be confirmed",
    medium: "Digital illustration",
    summary: "A portrait assembled from angular planes and simplified geometric shapes. Faceted changes in color and value describe facial volume while the curling hair contrasts those planes with repeated curves.",
    image: "/artworks/geometric-portrait.jpg",
    imageWidth: 2048,
    imageHeight: 2518,
    alt: "A stylized portrait of a person with blue-gray curly hair and a face rendered from polygonal planes against a muted purple background.",
    kind: "static"
  },
  {
    slug: "perspective-study",
    number: "03",
    title: "Perspective Study",
    subtitle: "Space and Geometry",
    artist: "Artist to be confirmed",
    medium: "Digital perspective drawing",
    summary: "An architectural streetscape organized through perspective construction. Receding edges, building faces, and guide lines make the geometry of spatial depth visible as part of the drawing itself.",
    image: "/artworks/perspective-city.jpg",
    imageWidth: 3166,
    imageHeight: 2048,
    alt: "A line-and-wash city drawing with multiple buildings arranged around streets, with perspective guide lines converging above the scene.",
    kind: "static"
  },
  {
    slug: "fibonacci-modulo-25",
    number: "04",
    title: "Fibonacci, Modulo 25",
    subtitle: "An Interactive Audiovisual Experience",
    artist: "Aedrian Ponce",
    medium: "Interactive web artwork · sonification · code",
    summary: "An audiovisual study of the Fibonacci sequence modulo 25. Each canonical residue is placed around a circular visual field and mapped to one of 25 ascending pitches. The pitch mapping and sound design are artistic choices; the Fibonacci residue sequence is the mathematical source.",
    image: "/artworks/fibonacci-preview.svg",
    imageWidth: 1200,
    imageHeight: 900,
    alt: "A dark circular mathematical visualization with repeated colored points and connecting paths, representing a preview of the interactive Fibonacci modulo 25 work.",
    kind: "interactive",
    interactiveUrl: "https://math-10-music.vercel.app",
    externalRepository: "https://github.com/Diannn3/math-10-music"
  }
];

export function getExhibit(slug: string) {
  return exhibits.find((exhibit) => exhibit.slug === slug);
}

export function getExhibitNeighbors(slug: string) {
  const index = exhibits.findIndex((exhibit) => exhibit.slug === slug);
  if (index === -1) return { previous: undefined, next: undefined };
  return {
    previous: index > 0 ? exhibits[index - 1] : undefined,
    next: index < exhibits.length - 1 ? exhibits[index + 1] : undefined
  };
}
