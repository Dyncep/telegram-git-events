export type Author = {
  date: string;
  email?: string;
  // The git author's name
  name: string;
  username: string;
};

// Same type as Author
export type Committer = Author & {};

export type Commit = {
  // An array of files added in the commit.
  added: string[];

  // Metaproperties for Git author/committer information.
  author: Author;

  // Metaproperties for Git author/committer information.
  committer: Committer;

  // Whether this commit is distinct from any that have been pushed before.
  distinct: boolean;

  id: string;

  // The commit message.
  message: string;

  // An array of files modified by the commit.
  modified: string[];

  // An array of files removed in the commit.
  removed: string[];

  // The ISO 8601 timestamp of the commit.
  timestamp: string;

  tree_id: string;

  // URL that points to the commit API resource.
  url: string;
};

export type Repository = {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: any;
  html_url: string;
  description: string;
  fork: boolean;
};

export type PushWebhookPayload = {
  // The SHA of the most recent commit on ref after the push.
  after: string;

  base_ref?: string;

  // The SHA of the most recent commit on ref before the push.
  before: string;

  // URL that shows the changes in this ref update, from the before commit to the after commit.
  // For a newly created ref that is directly based on the default branch,
  // this is the comparison between the head of the default branch and the after commit.
  // Otherwise, this shows all commits until the after commit.
  compare: string;

  // An array of commit objects describing the pushed commits.
  // (Pushed commits are all commits that are included in the compare between the before commit and the after commit.)
  // The array includes a maximum of 20 commits.
  // If necessary, you can use the Commits API to fetch additional commits.
  // This limit is applied to timeline events only and isn't applied to webhook deliveries.
  commits: Commit[];

  // Whether this push created the ref.
  created: boolean;

  // Whether this push deleted the ref.
  deleted: boolean;

  // An enterprise on GitHub.
  // Webhook payloads contain the enterprise property when the webhook is configured on an enterprise
  // account or an organization that's part of an enterprise account.
  // For more information, see "About enterprise accounts."
  enterprise: any;

  // Whether this push was a force push of the ref.
  forced: boolean;

  head_commit: Commit;

  // The GitHub App installation.
  // Webhook payloads contain the installation property when the event is configured
  // for and sent to a GitHub App. For more information, see "Using webhooks with GitHub Apps."
  installation: any;

  // A GitHub organization.
  // Webhook payloads contain the organization property when the webhook is configured
  // for an organization, or when the event occurs from activity in a repository owned by an organization.
  organization: any;

  // Metaproperties for Git author/committer information.
  pusher: Author;

  // The full git ref that was pushed. Example: refs/heads/main or refs/tags/v3.14.1.
  ref: string;

  // A git repository
  repository: Repository;

  // The GitHub user that triggered the event.
  // This property is included in every webhook payload.
  sender: any;
};
