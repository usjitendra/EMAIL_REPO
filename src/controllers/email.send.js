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
// // const email = [
// //   "subhashree.d@mindbrain.co.in",
// //   "nitin.p@arthdesignbuild.com",
// //   "akanksha.choudhary@caglobal.com",
// //   "hello@agentooz.com",
// //   "hiring@techveda.consulting",
// //   "ashwaq@cloudresources.net",
// //   "priyadeydas18@gmail.com",
// //   "hire.naariy@gmail.com",
// //   "hr@witarist.com",
// //   "aigetaicom@gmail.com",
// //   "preeti.eminence@gmail.com",
// //   "Talent@appalus.com"
// // ];
// const emails1 = [
//   "hiring@asvayuktech.com",
//   "sivajothihr@gmail.com",
//   "kunal@computronics.in",
//   "mahak.sunhare@computronics.in",
//   "ashwaq@cloudresources.net",
//   "HR@Netlarx.com",
//   "renganayaki@vysystems.com",
//   "team.skilledhyre@gmail.com",
//   "Forcecraver.aditya@gmail.com",
//   "jbhatia@forcecraver.com",
//   "hr@slazzy.in",
//   "gayathrig@im24x7.com",
//   "hr@ifastx.in",
//   "dharni@carmatech.in",
//   "hr@mpforall.com",
//   "hello@agentooz.com"
// ];
// export const send_function = async () => {
//   // await sendBulkEmails(emails1)
// }

// // 
// // 
// // 



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
//   "hire.naariy@gmail.com",
//   "parul.p@infinitysoftsystems.com"
// ];

// export const send_delhi = async () => {
//   // await send_Delahi_email(emails)
// }