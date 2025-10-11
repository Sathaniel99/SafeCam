import { StatsCard } from "@/components/Gallery/StatsCard";
import { MdOutlineInsertPhoto } from "react-icons/md";
import { VscFileSubmodule } from "react-icons/vsc";
import { IoVideocamOutline } from "react-icons/io5";
import type { ColorType } from "@/interfaces";

interface Stat {
  title: string;
  value: number;
  icon: React.ElementType;
  color: ColorType;
}

export const GalleryStats = ({
  total,
  images,
  videos,
}: {
  total: number;
  images: number;
  videos: number;
}) => {
  const stats: Stat[] = [
    { title: "ARCHIVOS", value: total, icon: VscFileSubmodule, color: "amber" },
    {
      title: "IMÁGENES",
      value: images,
      icon: MdOutlineInsertPhoto,
      color: "green",
    },
    { title: "VIDEOS", value: videos, icon: IoVideocamOutline, color: "cyan" },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mt-5">
      {stats.map((stat, i) => (
        <StatsCard key={i} {...stat} />
      ))}
    </div>
  );
};
