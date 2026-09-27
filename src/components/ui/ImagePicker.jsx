import { uploadToImgbb, hasImgbbKey } from "../../utils/imgbb";

export default function ImagePicker({
  label = "Profile image",
  value,
  onChange,
  onError,
}) {
  const onFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadToImgbb(file);
      onChange(url);
    } catch (err) {
      onError?.(err.message);
    }
  };

  return (
    <div className="space-y-2">
      <p className="text-sm text-[var(--color-muted)]">{label}</p>
      <input
        className="w-full rounded-xl border border-white/10 bg-[var(--color-panel)] px-3 py-2"
        type="url"
        placeholder="Image URL (https://...)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {hasImgbbKey() ? (
        <input type="file" accept="image/*" onChange={onFile} />
      ) : (
        <p className="text-xs text-[var(--color-muted)]">
          Optional: add <code className="text-[var(--color-accent)]">VITE_IMGBB_KEY</code> in client/.env to enable file upload.
        </p>
      )}
      {value && (
        <img src={value} alt="" className="h-16 w-16 rounded-xl object-cover" />
      )}
    </div>
  );
}
