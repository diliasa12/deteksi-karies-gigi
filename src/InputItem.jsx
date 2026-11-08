function InputItem({ index, image, onFileChange, name }) {
  const handleChange = (event) => {
    const file = event.target.files[0];
    // Mengirim file dan index kembali ke komponen induk
    onFileChange(index, file);
  };

  return (
    <div className="flex flex-col items-center p-5 rounded-2xl shadow-lg bg-white w-full relative overflow-hidden gap-2">
      <span className="text-sm font-medium text-gray-400">{name}</span>

      {/* Kotak Preview */}
      <div className="w-full aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden bg-white">
        {image?.previewUrl ? (
          <img
            src={image.previewUrl}
            alt={`Preview ${index + 1}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-xs text-gray-400 text-center px-2">Kosong</span>
        )}
      </div>

      {/* Tombol Upload (Label) */}
      <label
        htmlFor={`upload-gambar-${index}`}
        className="cursor-pointer w-full text-center !bg-[#E22867]  text-white font-medium py-1.5 px-2 rounded text-sm transition-colors duration-200"
      >
        {image?.previewUrl ? "Ganti" : "Upload"}
      </label>
      <input
        id={`upload-gambar-${index}`}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}
export default InputItem;
