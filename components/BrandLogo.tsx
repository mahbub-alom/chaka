import Image from "next/image";

interface BrandLogoProps {
  brandName: string;
  className?: string;
  sizeClassName?: string;
}

const BRAND_LOGOS: Record<string, string> = {
  toyota: "toyota.svg",
  "toyota oem": "toyota.svg",

  honda: "honda.svg",

  nissan: "nissan.svg",

  bmw: "bmw.svg",
  "bmw i": "bmw.svg",

  suzuki: "suzuki.svg",

  yamaha: "yamaha.svg",
  "yamaha genuine": "yamaha.svg",

  tesla: "tesla.svg",

  mitsubishi: "mitsubishi.svg",

  hyundai: "hyundai.svg",
  "hyundai ioniq": "hyundai.svg",

  byd: "byd.svg",

  bajaj: "bajaj.svg",

  hero: "hero.svg",

  "royal enfield": "royal-enfield.svg",

  tata: "tata.svg",

  isuzu: "isuzu.svg",

  mahindra: "mahindra.svg",

  wuling: "wuling.svg",

  audi: "audi.svg",

  "mercedes-benz": "mercedes-benz.svg",

  tvs: "tvs.svg",

  brembo: "brembo.svg",

  michelin: "michelin.svg",
};

export default function BrandLogo({
  brandName,
  className = "",
  sizeClassName = "w-4 h-4",
}: BrandLogoProps) {
  const norm = brandName.trim().toLowerCase();

  const logo =
    BRAND_LOGOS[norm] ??
    Object.entries(BRAND_LOGOS).find(([key]) => norm.includes(key))?.[1] ??
    "default.svg";

  return (
    <div className={`relative ${sizeClassName}`}>
      <Image
        src={`/logos/${logo}`}
        alt={brandName}
        fill
        sizes="(max-width: 640px) 80px, 96px"
        className={`object-contain ${className}`}
      />
    </div>
  );
}