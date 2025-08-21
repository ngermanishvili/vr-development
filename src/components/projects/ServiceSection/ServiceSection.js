const ServiceSection = () => {
  const services = [
    {
      src: "/shekvetili/service-1.webp",
      alt: "24 საათიანი მომსახურება და კონსიერჟი",
      title: "24 hour service",
      subtitle: "and concierge",
    },
    {
      src: "/shekvetili/service-2.webp",
      alt: "სამრეცხაო მომსახურება და ტრანსპორტი",
      title: "Laundry service",
      subtitle: "and transportation",
    },
    {
      src: "/shekvetili/service-3.webp",
      alt: "სრული სარემონტო მომსახურება",
      title: "Full renovation",
      subtitle: "service",
    },
    {
      src: "/shekvetili/service-4.webp",
      alt: "სამრეცხაო მომსახურება და ტრანსპორტი",
      title: "Laundry service",
      subtitle: "and transportation",
    },
    {
      src: "/shekvetili/service-5.webp",
      alt: "სრული სარემონტო მომსახურება",
      title: "Full renovation",
      subtitle: "service",
    },
  ]

  return (
    <section 
      className="bg-slate-100 py-12"
      aria-labelledby="services-heading"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <p 
            id="services-heading"
            className="text-3xl md:text-4xl font-bold tracking-wider text-[#CA9B43]"
            style={{ fontFamily: '"Baskerville Display PT", serif' }}
          >
            SERVICES
          </p>
        </div>

        <div>
          <ul 
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-10"
            role="list"
            aria-label="ხელმისაწვდომი მომსახურებები"
          >
            {services.map((service, index) => (
              <li 
                key={index} 
                className="flex flex-col items-center text-center"
                role="listitem"
              >
                <figure className="mb-6 flex items-center justify-center h-16">
                  <img
                    src={service.src}
                    alt={service.alt}
                    className="max-w-[54px] max-h-[54px] object-contain"
                    loading="lazy"
                  />
                </figure>

                <div className="space-y-0">
                  <p className="font-medium text-sm md:text-base leading-tight text-[#CA9B43]" style={{ fontFamily: '"Roboto", sans-serif' }}>
                    {service.title}
                  </p>
                  <p className="font-light text-sm md:text-base leading-tight text-[#CA9B43]" style={{ fontFamily: '"Roboto", sans-serif' }}>
                    {service.subtitle}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default ServiceSection;