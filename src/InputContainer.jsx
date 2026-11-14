import { useState } from "react";
import InputItem from "./InputItem";
import { analyzeImages } from "./api";
import { useContext } from "react";
import { LocaleContext } from "./context/LocaleContext";

const SIDES = [
  { labelId: "Tampak Kanan", labelEn: "Right Side", field: "kanan" },
  { labelId: "Tampak Kiri", labelEn: "Left Side", field: "kiri" },
  { labelId: "Tampak Atas", labelEn: "Upside", field: "atas" },
  { labelId: "Tampak Bawah", labelEn: "Downside", field: "bawah" },
  { labelId: "Tampak Depan", labelEn: "Front Side", field: "depan" },
];

export default function InputContainer() {
  const [images, setImages] = useState(Array(SIDES.length).fill(null));
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const locale = useContext(LocaleContext);

  const handleFileChange = (index, file) => {
    setImages((prev) => {
      const next = [...prev];

      // bebaskan memori preview lama
      if (next[index]?.previewUrl) URL.revokeObjectURL(next[index].previewUrl);

      next[index] = file
        ? { file, previewUrl: URL.createObjectURL(file) }
        : null;
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    const formData = new FormData();
    images.forEach((item, index) => {
      if (item?.file) formData.append(SIDES[index].field, item.file);
    });

    if (![...formData.keys()].length) {
      setError("Pilih minimal 1 gambar sebelum mengirim!");
      return;
    }

    setIsLoading(true);
    try {
      const data = await analyzeImages(formData);
      setResult(data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Terjadi kesalahan saat mengirim gambar.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 max-w-4xl mx-auto rounded-xl shadow-sm border border-gray-200"
    >
      <h2 className="text-sm font-extralight italic mb-6 text-gray-400">
        {locale === "id"
          ? "*Note: Setiap kolom bersifat opsional. Namun, untuk mendapatkan hasil yang lebih baik, kami menyarankan Anda untuk mengisi seluruh kolom yang tersedia."
          : "*Note: Each field is optional. However, for better results, we recommend that you fill in all the available fields."}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {images.map((image, index) => (
          <InputItem
            key={SIDES[index].field}
            index={index}
            name={locale === "id" ? SIDES[index].labelId : SIDES[index].labelEn}
            image={image}
            onFileChange={handleFileChange}
            disabled={isLoading}
          />
        ))}
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="!bg-[#E22867] text-white font-bold py-2.5 px-6 rounded-lg transition-colors duration-200 shadow-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading
            ? "Loading ..."
            : locale === "id"
              ? "Analisis Gambar"
              : "Analyze Pictures"}
        </button>
      </div>

      {/* Sementara tampilkan response mentah, nanti disesuaikan dgn format dari model */}
      {result && (
        <pre className="mt-6 p-4 bg-gray-50 rounded-lg text-xs overflow-auto">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </form>
  );
}
