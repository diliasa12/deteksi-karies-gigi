import { useState } from "react";
import InputItem from "./InputItem";
const name = [
  "Tampak Kanan",
  "Tampak Kiri",
  "Tampak Atas",
  "Tampak Bawah",
  "Tampak Depan",
];
export default function InputContainer() {
  const [images, setImages] = useState(Array(5).fill(null));

  const handleFileChange = (index, file) => {
    const newImages = [...images];

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      newImages[index] = { file, previewUrl };
    } else {
      newImages[index] = null;
    }

    setImages(newImages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    let hasFiles = false;

    images.forEach((item, index) => {
      if (item?.file) {
        formData.append(`gambar_${index + 1}`, item.file);
        hasFiles = true;
      }
    });

    if (!hasFiles) {
      alert("Pilih minimal 1 gambar sebelum mengirim!");
      return;
    }

    console.log("Data siap dikirim:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value.name);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 max-w-4xl mx-auto  rounded-xl shadow-sm border border-gray-200"
    >
      <h2 className="text-sm font-extralight italic mb-6 text-gray-400">
        *Note: Setiap kolom bersifat opsional. Namun, untuk mendapatkan hasil
        yang lebih baik, kami menyarankan Anda untuk mengisi seluruh kolom yang
        tersedia
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {images.map((image, index) => (
          <InputItem
            key={index}
            index={index}
            name={name[index]}
            image={image}
            onFileChange={handleFileChange}
          />
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          className="!bg-[#E22867] text-white font-bold py-2.5 px-6 rounded-lg transition-colors duration-200 shadow-sm cursor-pointer"
        >
          Analisis Gambar
        </button>
      </div>
    </form>
  );
}
