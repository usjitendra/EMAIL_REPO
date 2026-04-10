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
// const emailList = [
//   "kritika.sinha@nexthireconsulting.com",
//   "aqsa.amjad@invowork.com",
//   "hr@devution.com",
//   "minu.kumari@mobilecoderz.com",
//   "careers@kapoorwealthpartners.com",
//   "payalporwal@infograins.com",
//   "saloni.oberoi@simplifyingskills.com",
//   "Sunita.Joshi@simplifyingskills.com",
//   "vartika.kesarwani@echttech.com",
//   "hrvrinda076@gmail.com",
//   "rashi.jain@appsontechnologies.in",
//   "surbhia.infowind@gmail.com",
//   "hello@agentooz.com",
//   "vidyarockz97@gmail.com",
//   "Hari@exatechinc.com",
//   "Syed@exatechinc.com",
//   "paramita.chatterjee@muraai.com",
//   "recruitingME@Tcco.com",
//   "galya.marinova@recruitify-global.com",
//   "marfahtechnologies@gmail.com",
//   "nexicotech@gmail.com",
//   "st622957@gmail.com",
//   "maya@tekblu.us",
//   "hr@techanzy.com"
// ]
// export const send_function = async () => {
//   // await sendBulkEmails(emailList)
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
//   "hire.naariy@gmail.com",
//   "parul.p@infinitysoftsystems.com"
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
//   "hire.naariy@gmail.com",
//   "parul.p@infinitysoftsystems.com"
// ];

// export const send_sunil = async () => {
//   await send_sunil_email(emailss)
// }