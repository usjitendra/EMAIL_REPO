import axios from "axios";
export const sendBulkEmails = async (emails = []) => {
  let successCount = 0;
  let failCount = 0;
  try {
    const requests = emails.map((email) =>
      axios.post("http://13.233.107.1:9096/api/v1/auth/send", {
        email,
      })
    );


    console.log("requests", requests)
    const responses = await Promise.allSettled(requests);

    responses.forEach((res, index) => {
      if (res.status === "fulfilled") {
        successCount++;
        console.log(`✅ Success: ${emails[index]}`, res.value.data);
      } else {
        failCount++;
        console.log(`❌ Failed: ${emails[index]}`, res.reason.message);
      }
    });

    console.log("\n📊 Final Report:");
    console.log("✅ Success Count:", successCount);
    console.log("❌ Failed Count:", failCount);
    console.log("📨 Total:", emails.length);
  } catch (error) {
    console.error("Bulk Error:", error.message);
  }
};



const emails = [
  "anshika.bhalla@cloudit-us.com",
  "Hr@dagarbrothers.com",
  "vaidant@dagarbrothers.com",
  "hr@cpdsindia.com",
  "nio@weexglobal.com",
  "contact.theschoolofyou@gmail.com"
];
export const send_function = async () => {
  // await sendBulkEmails(emails)
}