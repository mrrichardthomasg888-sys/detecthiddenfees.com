import { createWriteStream, existsSync, readFileSync, writeFileSync } from "node:fs";
import { google } from "googleapis";

const repositoryRoot = process.cwd();
const batchDir = `${repositoryRoot}/social/youtube/batch-1`;
const resultsPath = `${batchDir}/results.json`;
const clientConfig = JSON.parse(process.env.YOUTUBE_CLIENT_SECRET_JSON || "{}");
const client = clientConfig.installed || clientConfig.web;
const refreshToken = process.env.YOUTUBE_REFRESH_TOKEN;

if (!client?.client_id || !client?.client_secret || !refreshToken) {
  console.error("YouTube credentials are not available in the workflow environment.");
  process.exit(2);
}

const oauth = new google.auth.OAuth2(client.client_id, client.client_secret);
oauth.setCredentials({ refresh_token: refreshToken });
const youtube = google.youtube({ version: "v3", auth: oauth });

const videos = [
  {
    file: "dealer-out-the-door-price.mp4",
    topic: "Dealer out-the-door price",
    title: "Dealer Out-the-Door Price: 4 Numbers to Check",
    description: "The monthly payment is not the total. Check the vehicle price, government charges, dealer-added fees, and optional products before signing. Educational information only.\n\nMore: https://detecthiddenfees.com/car-dealer-fees",
    hashtags: ["#CarBuying", "#DealerFees", "#ConsumerTips"],
    tags: ["dealer fees", "out the door price", "car buying", "car dealer fees", "hidden fees"],
    target_url: "https://detecthiddenfees.com/car-dealer-fees",
    cta: "Check the car-buying fee guide at DetectHiddenFees.com",
    keyword: "dealer out the door price"
  },
  {
    file: "construction-change-orders.mp4",
    topic: "Construction change orders",
    title: "Construction Change Orders: Check These 5 Details",
    description: "Before approving a construction change order, check the scope, price, materials, schedule impact, and approval record. Keep the signed change with the original quote. Educational information only.\n\nMore: https://detecthiddenfees.com/change-order-fees",
    hashtags: ["#Construction", "#ChangeOrders", "#ContractTips"],
    tags: ["construction change orders", "change order fees", "construction contract", "contract tips", "hidden fees"],
    target_url: "https://detecthiddenfees.com/change-order-fees",
    cta: "Review change-order questions at DetectHiddenFees.com",
    keyword: "construction change orders"
  },
  {
    file: "duplicate-medical-charges.mp4",
    topic: "Duplicate medical charges",
    title: "Duplicate Medical Charges: Compare Your Bill and EOB",
    description: "Before paying, compare the itemized medical bill with your insurance explanation of benefits when available. Repeated services, dates, or amounts are questions to verify—not a judgment about medical necessity. Educational information only.\n\nMore: https://detecthiddenfees.com/duplicate-medical-billing-charges",
    hashtags: ["#MedicalBills", "#BillingCheck", "#ConsumerTips"],
    tags: ["duplicate medical charges", "medical bill review", "itemized medical bill", "explanation of benefits", "billing errors"],
    target_url: "https://detecthiddenfees.com/duplicate-medical-billing-charges",
    cta: "Organize a medical-bill review at DetectHiddenFees.com",
    keyword: "duplicate medical charges"
  }
];

const now = new Date().toISOString();
let results = { batch: "youtube-batch-1", updated_at: now, videos: videos.map((video) => ({ ...video, status: "PENDING" })) };
if (existsSync(resultsPath)) {
  try { results = JSON.parse(readFileSync(resultsPath, "utf8")); } catch { /* rebuild a malformed local ledger safely */ }
}

for (const video of videos) {
  const current = results.videos.find((item) => item.file === video.file);
  if (current?.status === "PUBLISHED" && current.video_id) continue;
  const mediaPath = `${batchDir}/${video.file}`;
  if (!existsSync(mediaPath)) {
    current.status = "FAILED";
    current.error = "Rendered video file is missing.";
    results.updated_at = new Date().toISOString();
    writeFileSync(resultsPath, JSON.stringify(results, null, 2) + "\n");
    process.exitCode = 1;
    break;
  }
  try {
    const response = await youtube.videos.insert({
      part: ["snippet", "status"],
      requestBody: {
        snippet: {
          title: video.title,
          description: `${video.description}\n\n${video.hashtags.join(" ")}`,
          tags: video.tags,
          categoryId: "27",
          defaultLanguage: "en"
        },
        status: {
          privacyStatus: "public",
          selfDeclaredMadeForKids: false
        }
      },
      media: { body: createReadStream(mediaPath) }
    });
    const videoId = response.data.id;
    current.status = "PUBLISHED";
    current.video_id = videoId;
    current.public_url = `https://www.youtube.com/shorts/${videoId}`;
    current.published_at = new Date().toISOString();
    delete current.error;
    results.updated_at = new Date().toISOString();
    writeFileSync(resultsPath, JSON.stringify(results, null, 2) + "\n");
    console.log(`Published ${video.topic}: ${current.public_url}`);
    await new Promise((resolve) => setTimeout(resolve, 60000));
  } catch {
    current.status = "FAILED";
    current.error = "YouTube upload failed; see the protected workflow result.";
    results.updated_at = new Date().toISOString();
    writeFileSync(resultsPath, JSON.stringify(results, null, 2) + "\n");
    process.exitCode = 1;
    break;
  }
}

if (process.exitCode) process.exit(process.exitCode);
