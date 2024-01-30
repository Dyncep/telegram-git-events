import { Commit, PushWebhookPayload } from "../github/webhook.types";

const formatCommit = (commit: Commit) => {
  let html = `SHA: <b>${commit.id}</b>
<a href="${commit.url}">Link to Commit</a>
Message:
<b>${commit.message}</b>

Author:
<b>${commit.author.name} - ${commit.author.username}</b>
E-Mail: <i>${commit.author.email ? commit.author.email : "N/A"}</i>

Committer:
<b>${commit.committer.name} - ${commit.committer.username}</b>
E-Mail: <i>${commit.committer.email ? commit.committer.email : "N/A"}</i>
`;

  if (commit.removed.length > 0) {
    html += `
Removed Files:
<code>${commit.removed.map((e, index) => {
      return `${e}${index !== commit.removed.length - 1 ? "," : ""}\n`;
    })}</code>
`;
  }

  if (commit.added.length > 0) {
    html += `
Added Files:
<code>${commit.added.map((e, index) => {
      return `${e}${index !== commit.added.length - 1 ? "," : ""}\n`;
    })}</code>
`;
  }

  if (commit.modified.length > 0) {
    html += `
Modified Files:
<code>${commit.modified.map((e, index) => {
      return `${e}${index !== commit.modified.length - 1 ? "," : ""}\n`;
    })}</code>
`;
  }

  return html;
};

export const BOT_MESSAGES = {
  PushCreationEvent: (payload: PushWebhookPayload) => {
    let html = `
<b>New Push Event</b>
<i>Ref Created</i> ${payload.forced ? "\n<b><i>Force Push</i></b>" : ""}

<b>Repository</b>
<b>${payload.repository.name}</b>
<b><a href="${payload.repository.html_url}">View Repository</a></b>
${payload.repository.description}

<b>Reference</b>
Name: <b>${payload.ref}</b>
Commit SHA Before:
<b>${payload.before}</b>
Commit SHA After:
<b>${payload.after}</b>
<a href="${payload.compare}">Compare/Diffs</a>

<b>Pusher Information</b>
Name: <b>${payload.pusher.name}</b>
E-Mail: <b>${payload.pusher.email}</b>
`;
    if (payload.commits.length > 0) {
      html += `
<b>Commit(s) Information</b>
${payload.commits.map((e) => {
  return formatCommit(e);
})}
`;
    }
    return html;
  },
  PushDeletionEvent: (payload: PushWebhookPayload) => {
    let html = `
<b>New Push Event</b>
<i>Ref Deleted</i> ${payload.forced ? "\n<b><i>Force Push</i></b>" : ""}

<b>Repository</b>
<b>${payload.repository.name}</b>
<b><a href="${payload.repository.html_url}">View Repository</a></b>
${payload.repository.description}

<b>Reference</b>
Name: <b>${payload.ref}</b>
Commit SHA Before:
<b>${payload.before}</b>
Commit SHA After:
<b>${payload.after}</b>
<a href="${payload.compare}">Compare/Diffs</a>

<b>Pusher Information</b>
Name: <b>${payload.pusher.name}</b>
E-Mail: <b>${payload.pusher.email}</b>
`;
    if (payload.commits.length > 0) {
      html += `
<b>Commit(s) Information</b>
${payload.commits.map((e) => {
  return formatCommit(e);
})}
`;
    }

    return html;
  },
  DefaultPushEvent: (payload: PushWebhookPayload) => {
    let html = `
<b>New Push Event</b> ${payload.forced ? "\n<b><i>Force Push</i></b>" : ""}

<b>Repository</b>
<b>${payload.repository.name}</b>
<b><a href="${payload.repository.html_url}">View Repository</a></b>
${payload.repository.description}

<b>Reference</b>
Name: <b>${payload.ref}</b>
Commit SHA Before:
<b>${payload.before}</b>
Commit SHA After:
<b>${payload.after}</b>
<a href="${payload.compare}">Compare/Diffs</a>

<b>Pusher Information</b>
Name: <b>${payload.pusher.name}</b>
E-Mail: <b>${payload.pusher.email}</b>
`;

    if (payload.commits.length > 0) {
      html += `
<b>Commit(s) Information</b>
${payload.commits.map((e) => {
  return formatCommit(e);
})}
`;
    }
    return html;
  },
};
