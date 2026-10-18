// DATA SELURUH PRODUK
export const PRODUCTS = [
  {
    id: 1,
    name: "Headphone JBL",
    category: "Audio",
    price: 750000,
    rating: "4.8",
    image: "Headphone JBL.jpg",
    description: "Headphone berkualitas tinggi dengan suara yang jernih",
  },
  {
    id: 2,
    name: "Keyboard Noir",
    category: "Computer",
    price: 950000,
    rating: "4.9",
    image: "Keyboard Noir.jpg",
    description: "Keyboard dengan pencahayaan RGB dan tampilan gagah",
  },
  {
    id: 3,
    name: "Laptop Asus ROG Strix",
    category: "Computer",
    price: 37000000,
    rating: "4.7",
    image: "Laptop Asus ROG Strix.jpg",
    description: "Laptop gaming dengan performa tinggi",
  },
  {
    id: 4,
    name: "Mouse Razer Viper V3 Pro",
    category: "Computer",
    price: 3200000,
    rating: "4.6",
    image: "MouseRazerViper.jpg",
    description: "Mouse gaming dengan sensor presisi tinggi",
  },
  {
    id: 5,
    name: "ASUS ROG Astral GeForce RTX 5090",
    category: "Computer",
    price: 122600000,
    rating: "4.8",
    image: "RTX5090.jpg",
    description: "Kartu grafis dengan performa gaming 4K dan rendering berat",
  },
  {
    id: 6,
    name: "Speaker JBL",
    category: "Audio",
    price: 600000,
    rating: "4.8",
    image: "Speaker JBL.jpg",
    description: "Speaker dengan kualitas suara yang luar biasa",
  },
];

// FUNGSI MENGUBAH ANGKA MENJADI FORMAT RUPIAH (contoh: 750000 -> Rp 750.000)
export const formatRupiah = (angka) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(angka);
};
