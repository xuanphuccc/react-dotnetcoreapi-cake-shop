import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./config";
import { v4 as uuidv4 } from "uuid";

// ============ STORAGE ============
async function uploadFile(fileUpload, folder) {
  if (!fileUpload || folder.length === 0) return;
  const fileRef = ref(storage, `${folder}/${uuidv4()}_${fileUpload.size}_${fileUpload.name}`);

  try {
    const snapshot = await uploadBytes(fileRef, fileUpload);
    const url = await getDownloadURL(snapshot.ref);

    return { url, fullPath: snapshot.metadata.fullPath };
  } catch (error) {
    console.warn(error);
    return error;
  }
}

export { uploadFile };
