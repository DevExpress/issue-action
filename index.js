const core = require('@actions/core');
const github = require('@actions/github');

try {
    const msg = {
        "@type": "MessageCard",
        "@context": "https://schema.org/extensions",
        "summary": "Issue " + github.context.payload.number,
        "themeColor": "0078D7",
        "title": "Issue opened: \"" + github.context.payload.title + "\"",
        "sections": [
            {
                "activityTitle": github.context.payload.user.login,
                "activitySubtitle": github.context.payload.created_at,
                "activityImage": github.context.payload.user.avatar_url,
                "facts": [
                    {
                        "name": "Issue #:",
                        "value": github.context.payload.number
                    }
                ],
                "text": github.context.payload.body
            }
        ],
        "potentialAction": [
            {
                "@type": "ActionCard",
                "name": "Add a comment",
                "inputs": [
                    {
                        "@type": "TextInput",
                        "id": "comment",
                        "title": "Enter your comment",
                        "isMultiline": true
                    }
                ],
                "actions": [
                    {
                        "@type": "HttpPOST",
                        "name": "OK",
                        "target": "http://..."
                    }
                ]
            },
            {
                "@type": "HttpPOST",
                "name": "Close",
                "target": "http://..."
            },
            {
                "@type": "OpenUri",
                "name": "View in GitHub",
                "targets": [
                    {
                        "os": "default",
                        "uri": "http://..."
                    }
                ]
            }
        ]
    };
    core.setOutput('json', JSON.stringify(msg));
} catch (error) {
    core.setFailed(error.message);
}