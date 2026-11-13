function InputItem({ index, image, onFileChange, name, disabled }) {
  const handleChange = (event) => {
    onFileChange(index, event.target.files[0]);
    event.target.value = ""; // supaya file yang sama bisa dipilih ulang
  };

  const handleRemove = () => onFileChange(index, null);

  return (
    <div className="flex flex-col items-center p-5 rounded-2xl shadow-lg bg-white w-full relative overflow-hidden gap-2">
      <span className="text-sm font-medium text-gray-400">{name}</span>

      {/* Kotak Preview */}
      <div className="group relative w-full aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden bg-white">
        {image?.previewUrl ? (
          <>
            <img
              src={image.previewUrl}
              alt={`Preview ${name}`}
              className="w-full h-full object-cover"
            />

            {!disabled && (
              <button
                type="button"
                onClick={handleRemove}
                aria-label={`Hapus gambar ${name}`}
                className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-visible:opacity-100 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-10 h-10 text-white"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </>
        ) : (
          <span className="text-xs text-gray-400 text-center px-2">Kosong</span>
        )}
      </div>

      {/* Tombol Upload (Label) */}
      <label
        htmlFor={`upload-gambar-${index}`}
        className={`w-full text-center !bg-[#E22867] text-white font-medium py-1.5 px-2 rounded text-sm transition-colors duration-200 ${
          disabled ? "opacity-60 pointer-events-none" : "cursor-pointer"
        }`}
      >
        {image?.previewUrl ? "Ganti" : "Upload"}
      </label>
      <input
        id={`upload-gambar-${index}`}
        type="file"
        accept="image/*"
        className="hidden"
        capture="environment"
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  );
}
export default InputItem;
