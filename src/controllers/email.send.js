// const axios = require("axios");
// export const sendBulkEmails = async (emails = []) => {
//   try {
//     const requests = emails.map((email) =>
//       axios.post("http://13.233.107.1:9696/api/v1/auth/send", {
//         email,
//       })
//     );


//     console.log("requests", requests)
//     const responses = await Promise.allSettled(requests);

//     responses.forEach((res, index) => {
//       if (res.status === "fulfilled") {
//         console.log(`✅ Success: ${emails[index]}`, res.value.data);
//       } else {
//         console.log(`❌ Failed: ${emails[index]}`, res.reason.message);
//       }
//     });

//   } catch (error) {
//     console.error("Bulk Error:", error.message);
//   }
// };

// const emai1 = ["ustest055@mail.com"]

// export const send_function = async () => {
//   await sendBulkEmails(emai1)
// }