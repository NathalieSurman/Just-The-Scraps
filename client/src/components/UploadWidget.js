// import { useEffect, useRef } from "react";
// const url = "https://api.cloudinary.com/v1_1/dpacwtxaj/image/upload";
// const form = document.querySelector("form");

// const UploadWidget = () => {
//   form.addEventListener("submit", (e) => {
//     e.preventDefault();

//     const files = document.querySelector("[type=file]").files;
//     const formData = new FormData();

//     for (let i = 0; i < files.length; i++) {
//       let file = files[i];
//       formData.append("file", file);
//       formData.append("upload_preset", "docs_upload_example_us_preset");

//       fetch(url, {
//         method: "POST",
//         body: formData,
//       })
//         .then((response) => {
//           return response.text();
//         })
//         .then((data) => {
//           document.getElementById("data").innerHTML += data;
//         });
//     }
//   });

//   return <button onClick={() => widgetRef.current.open()}>Upload</button>;
// };

// export default UploadWidget;
