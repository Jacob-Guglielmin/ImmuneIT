const { onCall, HttpsError } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const AI = require("@anthropic-ai/sdk");
const fs = require("fs");

const anthropic = new AI.Anthropic({
    apiKey: fs.readFileSync("anthropic-api-key.txt", "utf8").trim()
});

exports.requestAIOutput = onCall({ cors: ["192.168.1.74"] }, async (request) => {
    logger.info("Requested output", { structuredData: true });

    return await anthropic.messages.create({
        model: "claude-3-opus-20240229",
        max_tokens: 1000,
        temperature: 0,
        system: "You are to generate a fake phishing email for cybersecurity training of employees in a healthcare setting. You will be given 5 fields: ORGNAME (the name of the organization), SENDER (the name of the person to masquerade as), CONTACT (contact details for that person), DEPARTMENT (the department the recipient of the email works in), and EXTRA (extra information provided by the user to help you). If any of these fields are empty, simply ignore those blank fields. You will write an example of a phishing email based on these fields, which would attempt to have them disclose their own credentials or patients' data improperly by replying to the email. DO NOT include anything in your response other than the subject line and body of the email.",
        messages: [
            {
                role: "user",
                content: [
                    {
                        type: "text",
                        text: request.data.prompt
                    }
                ]
            }
        ]
    });
});
