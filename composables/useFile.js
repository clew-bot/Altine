import { ref } from "vue";
const photoData = ref([]);
const vidData = ref([]);
const scopedFiles = ref([]);
const allMedia = ref([]);
let count;
export default async function (allFiles) {
  const config = useRuntimeConfig().public;
  const token = config.IMAGE_TOKEN;
  allMedia.value = [];
  photoData.value = [];
  vidData.value = [];
  scopedFiles.value = allFiles;

  for (count = 0; count <= allFiles.length - 1; count++) {
    if(allFiles[count].size / 1048576 > 50 ) {
      console.log('too big')
      return {error: `File ${allFiles[count].name} is too big! We support files up to 47MB`}
    }
    let formData = new FormData();
    formData.append("key", token);
    formData.append("media", allFiles[count]);

    let backUpFormData = new FormData();
    formData.append("upload", allFiles[count]);
    await saveImage(formData, backUpFormData);
  }
  if (count == allFiles.length) {
    return {imageData: photoData.value, videoData: vidData.value, media: allMedia.value,  emit: true, error: false };
  }
}

const possibleImageTypes = {
  '.jpg': '.jpg',
  '.png': '.png',
  '.gif': '.gif',
};

const possibleVideoTypes = {
  '.mp4': ".mp4",
};

const saveImage = async (formData, backUpFormData) => {
  const data = await useFetch("https://thumbsnap.com/api/upload", {
    method: "POST",
    body: formData,
  });
  console.log(data)
  if (data) {
    console.log('working...')
    const fileType = data.data.value.data.media.slice(-4);
    if (fileType in possibleImageTypes) {
      const mediaObj = {
        media: data.data.value.data.media,
        height: data.data.value.data.height,
        width: data.data.value.data.width,
      }
      allMedia.value.push(mediaObj);
      photoData.value.push(data.data.value.data);
    } else if (fileType in possibleVideoTypes) {
      const mediaObj = {
        media: data.data.value.data.media,
        height: data.data.value.data.height,
        width: data.data.value.data.width,
      }
      allMedia.value.push(mediaObj);
      vidData.value.push(data.data.value.data);
    }
  } else {
    console.log('Something went wrong, trying backup...')
  }
};
