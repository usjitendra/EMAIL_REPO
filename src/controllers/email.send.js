// import axios from "axios";
// const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// export const sendBulkEmails = async (emails = []) => {
//   let successCount = 0;
//   let failCount = 0;

//   const skipEmails = ["hr@webbrainstechnologies.com"]; // 🚫 skip list

//   for (let i = 0; i < emails.length; i++) {

//     // 🚫 Skip specific email
//     if (skipEmails.includes(emails[i])) {
//       console.log(`⏭️ Skipped: ${emails[i]}`);
//       continue;
//     }

//     try {
//       const res = await axios.post(
//         "http://13.233.107.1:9096/api/v1/auth/send",
//         { email: emails[i] }
//       );

//       successCount++;
//       console.log(`✅ Success: ${emails[i]}`, res.data);

//     } catch (err) {
//       failCount++;
//       console.log(`❌ Failed: ${emails[i]}`, err.message);
//     }

//     await delay(500); // 🔥 delay
//   }


//   console.log("\n📊 Final Report:");
//   console.log("✅ Success Count:", successCount);
//   console.log("❌ Failed Count:", failCount);
//   console.log("📨 Total:", emails.length);
// };



// const sss = [
//   "career@appinventiv.com",
//   "amisha.atray@appinventiv.com",
//   "info@savvyr.in",
//   "shefali.goel@isourse.com"
// ];



// export const send_function = async () => {
//   // await sendBulkEmails(updatedEmailList)
// }


// export const send_Delahi_email = async (emails = []) => {
//   let successCount = 0;
//   let failCount = 0;

//   try {
//     for (let i = 0; i < emails.length; i++) {

//       // 🚫 Skip specific email
//       if (emails[i] === "hr@webbrainstechnologies.com") {
//         console.log(`⏭️ Skipped: ${emails[i]}`);
//         continue;
//       }

//       try {
//         const res = await axios.post(
//           "http://13.233.107.1:9096/api/v1/auth/delhi",
//           { email: emails[i] }
//         );

//         successCount++;
//         console.log(`✅ Success: ${emails[i]}`, res.data);

//       } catch (err) {
//         failCount++;
//         console.log(`❌ Failed: ${emails[i]}`, err.message);
//       }

//       await delay(500); // 🔥 0.5 sec delay
//     }

//     console.log("\n📊 Final Report:");
//     console.log("✅ Success Count:", successCount);
//     console.log("❌ Failed Count:", failCount);
//     console.log("📨 Total:", emails.length);

//   } catch (error) {
//     console.error("Bulk Error:", error.message);
//   }
// };
// const emails = [
//   "hr@pravux.com",
// ];

// export const send_delhi = async () => {
//   // await send_Delahi_email(emails)
// }



// /****************** For Sunil ******************/


// export const send_sunil_email = async (emails = []) => {
//   let successCount = 0;
//   let failCount = 0;

//   try {
//     for (let i = 0; i < emails.length; i++) {

//       // 🚫 Skip specific email
//       if (emails[i] === "hr@webbrainstechnologies.com") {
//         console.log(`⏭️ Skipped: ${emails[i]}`);
//         continue;
//       }

//       try {
//         const res = await axios.post(
//           "http://13.233.107.1:9096/api/v1/auth/sunil",
//           { email: emails[i] }
//         );

//         successCount++;
//         console.log(`✅ Success: ${emails[i]}`, res.data);

//       } catch (err) {
//         failCount++;
//         console.log(`❌ Failed: ${emails[i]}`, err.message);
//       }

//       await delay(500); // 🔥 0.5 sec delay
//     }

//     console.log("\n📊 Final Report:");
//     console.log("✅ Success Count:", successCount);
//     console.log("❌ Failed Count:", failCount);
//     console.log("📨 Total:", emails.length);

//   } catch (error) {
//     console.error("Bulk Error:", error.message);
//   }
// };
// const emailss = [
//   "hr@devution.com",
// ];

// export const send_sunil = async () => {
//   // await send_sunil_email(emailLists)
// }