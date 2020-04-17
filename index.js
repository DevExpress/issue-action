const core = require('@actions/core');
const github = require('@actions/github');

try {
    const obj = {
        "@type": "MessageCard",
        "@context": "https://schema.org/extensions",
        "summary": `Issue ${github.context.payload.issue.id}`,
        "themeColor": "0078D7",
        "title": `Issue opened: ${github.context.payload.issue.title}`,
        "sections": [
            {
                "activityTitle": github.context.payload.sender.login,
                "activitySubtitle": github.context.payload.issue.created_at,
                "activityImage": github.context.payload.sender.avatar_url,
                "facts": [
                    {
                        "name": "Issue #:",
                        "value": github.context.payload.issue.id
                    }
                ],
                "text": github.context.payload.issue.body
            }
        ],
        "potentialAction": [
            {
                "@type": "ActionCard",
                "name": "Add a comment",
                "inputs": [
                    {
                        "@type": "TextInput",
                        "id": "body",
                        "title": "Enter your comment",
                        "isMultiline": true
                    }
                ],
                "actions": [
                    {
                        "@type": "HttpPOST",
                        "name": "OK",
                        "target": github.context.payload.issue.comments_url
                    }
                ]
            },
            {
                "@type": "OpenUri",
                "name": "View in GitHub",
                "targets": [
                    {
                        "os": "default",
                        "uri": github.context.payload.issue.html_url
                    }
                ]
            }
        ]
    };
    const msg = JSON.stringify(obj);
    core.setOutput('json', msg);
} catch (error) {
    core.setFailed(error.message);
}