import { ImagePlus, User } from "lucide-react";
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
    if (!hasImgbbKey()) {
      onError?.("Photo upload is not set up yet. You can update your picture later from Profile.");
      return;
    }
    try {
      const url = await uploadToImgbb(file);
      onChange(url);
      onError?.("");
    } catch (err) {
      onError?.(err.message);
    }
    e.target.value = "";
  };

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-soft)] p-4">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[var(--panel-solid)] ring-2 ring-[var(--border)]">
        {value ? (
          <img src={value} alt="" className="h-full w-full object-cover" />
        ) : (
          <User className="text-[var(--muted)]" size={28} />
        )}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium">{label}</p>
        <label className="mt-2 inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--panel-solid)] px-3 py-2 text-sm font-medium transition hover:border-[var(--accent)]">
          <ImagePlus size={16} />
          Upload photo
          <input type="file" accept="image/*" className="hidden" onChange={onFile} />
        </label>
        <p className="mt-1 text-xs text-[var(--muted)]">JPG or PNG recommended.</p>
      </div>
    </div>
  );
}
