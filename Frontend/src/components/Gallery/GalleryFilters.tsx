import { FilterButton } from "@/components/Gallery/FilterButtons";

interface Props {
  photosFilter: string;
  setPhotosFilter: (val: string) => void;
}

export const GalleryFilters = ({ photosFilter, setPhotosFilter }: Props) => {
  const filterbuttons = [
    { text: "Todo", tooltip: "Todos los archivos", value: "todo" },
    { text: "Imágenes", tooltip: "Solo fotos", value: "imagenes" },
    { text: "Video", tooltip: "Solo videos", value: "video" },
  ];

  return (
    <div className="flex justify-start mt-5">
      <div className="flex bg-slate-700 p-1 rounded-md">
        {filterbuttons.map((b, i) => (
          <FilterButton
            key={i}
            text={b.text}
            tooltipText={b.tooltip}
            filterValue={b.value}
            activeFilter={photosFilter}
            onClick={setPhotosFilter}
          />
        ))}
      </div>
    </div>
  );
};
