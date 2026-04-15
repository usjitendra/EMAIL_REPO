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



// const email = [
//   "t.pooja@drreddysfoundation.org",
//   "amruta.k@upperthrust.com",
//   "hrteam@codiasticsoft.com",
//   "hr@mymonk.in",
//   "hr@kretoss.com",
//   "nitya.recruitment24@gmail.com",
//   "techdevi29@gmail.com",
//   "smaiti@aapnainfotech.com",
//   "shikha.bhattacharya@techolution.com",
//   "hr@lambdalogics.com",
//   "mpavani@teqmavens.com",
//   "akanksha.choudhary@caglobal.com",
//   "diksha.dhakate@codersbrain.com",
//   "logicalhr.softtech@gmail.com",
//   "tvijayadevi@optimhire.com",
//   "career@resourcedekho.com",
//   "hr@myproject.ai",
//   "hr@codingclave.com",
//   "surbhia.infowind@gmail.com",
//   "hr@ihookwebsolutions.com"
// ]

// const emailsss = [
//   "ankita@veritech.ai",
//   "ragini.b@datasysamerica.com",
//   "m.rahulkumar@staffbees.com",
//   "vinay@careits.com",
//   "nitika.kalra@helixbeat.com",
//   "nishantp@softclouds.com",
//   "mahmoodalimir772@gmail.com",
//   "hr@writlabs.com",
//   "info@staffrex.in",
//   "sumits@sysmind.com",
//   "joyce@narveetech.com",
//   "jobs@starkdigital.net",
//   "jagriti.sharma@xicom.biz",
//   "manoj.pant@joveo.com",
//   "shikha.bhattacharya@techolution.com",
//   "director@eyewynk.com",
//   "cv@ukbindia.com",
//   "raviteja.t@thehirewings.com"
// ];

// const remoteEmail =
//   [
//     "hr@dextertechnologies.com",
//     "radheygopal.sharma@shriramgi.com",
//     "sonalika@shriramgi.in",
//     "shikha@mediagoats.agency",
//     "ta@vpc-staffing.com"
//   ]

// const remails = [
//   "hr@im24x7.com",
//   "priya.pal@vayuz.com",
//   "careers.india@urbanic.com",
//   "janki.pandit@urbanic.com",
//   "somnath@hmw3d.com",
//   "priyanka.singh@hmw3d.com",
//   "namrata.thakral@vayuz.com",
//   "suhani.wadhwa@vayuz.com",
//   "sakshi.pandey@vayuz.com",
//   "aryan.gupta@vayuz.com",
//   "gursimran@freshprints.com"
// ];



// export const send_function = async () => {
//   // await sendBulkEmails(remoteEmail)
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