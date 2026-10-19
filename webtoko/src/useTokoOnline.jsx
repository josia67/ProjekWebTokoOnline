import { useState, useEffect } from "react";
import { PRODUCTS, formatRupiah } from "./data";

export function useTokoOnline() {
  // STATE NAVIGASI HALAMAN ("home", "detail", "cart", "checkout")
  const [currentView, setCurrentView] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);

  // STATE KERANJANG (Diambil dari localStorage)
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cart_items");
    return saved ? JSON.parse(saved) : [];
  });

  // STATE PENCARIAN & NOTIFIKASI
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState("");

  // STATE FORMULIR CHECKOUT & ERROR VALIDASI
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    telepon: "",
    alamat: "",
    pembayaran: "transfer",
  });
  const [formErrors, setFormErrors] = useState({});

  // SIMPAN KERANJANG KE LOCALSTORAGE SAAT BERUBAH
  useEffect(() => {
    localStorage.setItem("cart_items", JSON.stringify(cartItems));
  }, [cartItems]);

  // NOTIFIKASI TOAST
  const showNotification = (pesan) => {
    setNotification(pesan);
    setTimeout(() => setNotification(""), 3000);
  };

  // HANDLER PANDUAN HALAMAN DETAIL
  const handleViewDetail = (product) => {
    setSelectedProduct(product);
    setCurrentView("detail");
  };

  // FITUR 1: TAMBAH KE KERANJANG
  const handleAddToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
    showNotification(`${product.name} berhasil ditambahkan ke keranjang!`);
  };

  // FITUR 2: HAPUS DARI KERANJANG
  const handleRemoveFromCart = (indexHapus) => {
    const produkDihapus = cartItems[indexHapus];
    const keranjangBaru = cartItems.filter((_, index) => index !== indexHapus);
    setCartItems(keranjangBaru);
    showNotification(`${produkDihapus.name} dihapus dari keranjang`);
  };

  // FITUR 3: VALIDASI FORMULIR PEMESANAN
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.nama.trim()) errors.nama = "Nama lengkap wajib diisi";
    if (!formData.email.trim()) {
      errors.email = "Email wajib diisi";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Format email tidak valid";
    }
    if (!formData.telepon.trim()) {
      errors.telepon = "Nomor telepon wajib diisi";
    } else if (!/^[0-9]+$/.test(formData.telepon)) {
      errors.telepon = "Nomor telepon hanya boleh berupa angka";
    }
    if (!formData.alamat.trim())
      errors.alamat = "Alamat pengiriman wajib diisi";
    return errors;
  };

  // FITUR 4: PROSES SUBMIT CHECKOUT
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    alert(
      `Pesanan Berhasil Disimpan!\n\nNama: ${formData.nama}\nTotal Pembayaran: ${formatRupiah(total)}\nMetode: ${formData.pembayaran.toUpperCase()}\n\nTerima kasih telah berbelanja di DiJotosTech!`,
    );

    // Reset State setelah order
    setCartItems([]);
    setFormData({
      nama: "",
      email: "",
      telepon: "",
      alamat: "",
      pembayaran: "transfer",
    });
    setFormErrors({});
    setCurrentView("home");
  };

  // FILTER PRODUK PENCARIAN
  const filteredProducts = PRODUCTS.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return {
    currentView,
    setCurrentView,
    selectedProduct,
    handleViewDetail,
    cartItems,
    searchTerm,
    setSearchTerm,
    notification,
    formData,
    formErrors,
    handleInputChange,
    handleFormSubmit,
    filteredProducts,
    totalPrice,
    handleAddToCart,
    handleRemoveFromCart,
    formatRupiah,
  };
}
