

const Gallery = () => {
  const images = [
    { src: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1000&auto=format&fit=crop", size: "col-span-1" },
    { src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z3ltfGVufDB8fDB8fHww", size: "col-span-1" },
    { src: "https://images.unsplash.com/photo-1604480133435-25b86862d276?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fGd5bXxlbnwwfHwwfHx8MA%3D%3D", size: "col-span-1" },
    { src: "https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzJ8fGd5bXxlbnwwfHwwfHx8MA%3D%3D", size: "col-span-1" },
    { src: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODh8fGd5bXxlbnwwfHwwfHx8MA%3D%3D", size: "col-span-1" },
    { src: "https://images.unsplash.com/photo-1648995361141-30676a75fd27?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTR8fGd5bXxlbnwwfHwwfHx8MA%3D%3D", size: "col-span-2" },
    { src: "https://images.unsplash.com/photo-1591027480007-a42f6ef886c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTh8fGd5bXxlbnwwfHwwfHx8MA%3D%3D", size: "col-span-1" },
    { src: "https://images.unsplash.com/photo-1517964603305-11c0f6f66012?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTMxfHxneW18ZW58MHx8MHx8fDA%3D", size: "col-span-2" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-2xl font-bold italic tracking-tighter mb-10">// Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img, i) => (
          <div key={i} className={`${img.size} rounded-[2rem] overflow-hidden h-48 md:h-64`}>
            <img src={img.src} alt="Gym Gallery" className="w-full h-full object-cover hover:scale-110 transition duration-500" />
          </div>
        ))}
      </div>
    </section>
  );
};


export default Gallery;