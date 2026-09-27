export function hasImgbbKey() {
  return Boolean(import.meta.env.VITE_IMGBB_KEY?.trim());
}

export async function uploadToImgbb(file) {
  const key = import.meta.env.VITE_IMGBB_KEY;
  if (!key) {
    throw new Error(
      "File upload needs VITE_IMGBB_KEY in client/.env — or paste an image URL instead.",
    );
  }

  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error?.message || "Image upload failed");
  }

  return data.data.url;
}
