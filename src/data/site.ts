export const site = {
  name: "Thouraz Pub",
  founded: 1987,
  address: {
    street: "Via Astichello, 58",
    postalCode: "36030",
    city: "Montecchio Precalcino",
    province: "VI",
    country: "IT",
  },
  phoneDisplay: "+39 348 888 9533",
  phoneHref: "tel:+393488889533",
  whatsapp: "https://wa.me/393488889533",
  email: "thourazpub@gmail.com",
  instagram: "https://www.instagram.com/thourazpub/",
  maps: "https://www.google.com/maps/search/?api=1&query=Thouraz+Pub%2C+Via+Astichello+58%2C+Montecchio+Precalcino",
  hours: "20:00–04:00",
} as const;

export const menuLinks = [
  {
    label: "Entro le 20:00",
    subtitle: "Listino Pomeridiano",
    href: "https://drive.google.com/uc?export=view&id=1hQtGVg2_PObyspC257jJXZEzRhlsPvPB",
  },
  {
    label: "Dalle 20:00 alle 22:00",
    subtitle: "Listino Promozione",
    href: "https://drive.google.com/uc?export=view&id=1LzRrm82oe7Vpv4HYkn-FJ4haHvLDzsjA",
  },
  {
    label: "Dalle 22:00 all'01:00",
    subtitle: "Listino Serale",
    href: "https://drive.google.com/uc?export=view&id=1qCiwczPa95gq5gEGBsM1IMCdO4KlREXV",
  },
  {
    label: "Dalle 01:00",
    subtitle: "Listino Notturno",
    href: "https://drive.google.com/uc?export=view&id=1u6ZBHdsba8s25tFmrd4q3hnHbIrCjOqE",
  },
] as const;
