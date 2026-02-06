import Image from "next/image";

const Gallery = ({ gallery }) => {
  return (
    <section className="container">
      <div className="grid grid-cols-2 gap-1 imageshowCase">
        <Image src={gallery[0]} className="h-[400px]" alt="Main Pic" width={400} height={400} />

        <div className="grid grid-cols-2 grid-rows-2 h-[400px] gap-1">
          {gallery.slice(1).map((img, i) => (
            <Image
              key={i}
              src={img}
              className="h-[400px]"
              alt={`Gallery Image ${i + 1}`}
              width={400}
              height={400}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
