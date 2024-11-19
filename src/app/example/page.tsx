"use client";
import { UploadButton } from "~/utils/uploadthing";
import { api } from "~/trpc/react";
export default function ExamplePage() {
  const { data: photoData, refetch } = api.photos.getAllPhotos.useQuery();
  const { mutate: createPhoto } = api.photos.createPhoto.useMutation(); //загрузка фотографий с помощью процедуры
  const handleUpload = (res: { name: string; url: string } | undefined) => {
    createPhoto(
      { name: res?.name ?? "", url: res?.url ?? "", galleryId: 2 },
      {
        onSuccess: () => {
          void refetch();
        },
      },
    );
  };

  return (
    <div>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
          handleUpload(res[0]);
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
      <div className="border-white-200 container m-auto flex grid grid-cols-6 flex-row border">
        {photoData?.map((photo) => (
          <img
            className="col-span-2 md:h-full md:w-full"
            key={photo.id}
            src={photo.url ?? ""}
          />
        ))}
      </div>

      {/* <div className="border-white-200 container m-auto flex grid grid-cols-6 flex-row border">
        <img
          className="col-span-2 md:h-full md:w-full"
          src="https://as2.ftcdn.net/v2/jpg/01/18/73/53/1000_F_118735384_xHRQIw8jkH08enDue9joHsgnN8W4WazK.jpg"
        />
        <img
          className="col-span-2 md:h-full md:w-full"
          src="https://as2.ftcdn.net/v2/jpg/04/76/87/91/1000_F_476879175_0ErkgrAqqQdSvOsrnobBaDDfF7VuV7C3.jpg"
        />
        <img
          className="col-span-2 md:h-full md:w-full"
          src="https://as2.ftcdn.net/v2/jpg/02/85/87/17/1000_F_285871716_ypPApdIQbRVop1DlaM5NvvhZuqMf3Hpr.jpg"
        />
        <img
          className="col-span-2 md:h-full md:w-full"
          src="https://as2.ftcdn.net/v2/jpg/05/96/77/41/1000_F_596774173_teOSqHb3P27p5tILGc5ZAlxj92QgJMzP.jpg"
        />
        <img
          className="col-span-2 md:h-full md:w-full"
          src="https://as1.ftcdn.net/v2/jpg/01/18/73/53/1000_F_118735384_xHRQIw8jkH08enDue9joHsgnN8W4WazK.jpg"
        />
        <img
          className="col-span-2 md:h-full md:w-full"
          src="https://as1.ftcdn.net/v2/jpg/09/99/30/58/1000_F_999305873_vu8dIHIQV57jNOv1rCLYFtEAFZTdzZVk.jpg"
        />
      </div> */}
    </div>
  );
}
