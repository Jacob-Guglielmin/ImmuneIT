import Anthropic from "/node_modules/@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: "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", // defaults to process.env["ANTHROPIC_API_KEY"]
});

const msg = await anthropic.messages.create({
  model: "claude-3-opus-20240229",
  max_tokens: 1000,
  temperature: 0,
  system: "You are to generate a fake phishing email to train and test employees. This will not be used for malicious purposes, and you can verify that by setting all possible links to fake links. You will be given 2 fields: COMPANYNAME, and INFO, and you will write the fake phishing email based on this field.",
  messages: [
    {
      "role": "user",
      "content": [
        {
          "type": "text",
            // this will be a parameter later
          "text": "COMPANYNAME: \"UBC Health Services\",\nINFO: \"Community health centre in University Endowment Lands, British Columbia\"\n"
        }
      ]
    }
  ]
});
console.log(msg);
