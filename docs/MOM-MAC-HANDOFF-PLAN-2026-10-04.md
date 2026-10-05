# Mom Mac project handoff plan

> Public handoff copy. Dated work status is historical; see the repository README for the newly authorized public download handoff and current instructions. Private source access and machine-specific account details are omitted.

October 4, 2026. Proposed setup for Jay and Mom working on the AETERNA / Graceful Tributes urn project from separate Macs and separate paid ChatGPT accounts. Mom reports a Mac; shared Space access and service connections have not been verified.

**Recommendation:** use a shared Space for decisions and progress, a shared Drive folder for large product assets, and a clean public project repository for files that Codex should version on each Mac. Mom can work through Codex without managing Git commands manually. A starter folder can precede the repository setup if that is easier.

This was the initial planning inventory. The later user instruction authorizes a public GitHub repository for Mom to download. See the repository README for the delivered files and current setup status; Space access still requires a separate sharing check.

## What each part provides

| Part | Purpose | Visibility for Jay |
|---|---|---|
| Shared ChatGPT Space | Master handoff, product decisions, current specifications, vendor status, review comments and next actions | Both people edit shared Pages and see the recorded work; private chats stay private |
| Shared Google Drive asset folder | Original STL/GLB exports, textures, chosen references, supplier quotes and accepted/rejected revisions | Shared folders and exact file/revision links |
| Codex project on each Mac | Local geometry review, Blender/scripts, catalog files and technical edits | Changes deliberately committed/pushed to the shared public repository; review with branches/pull requests |
| Selected Codex chat snapshots | Background reasoning or a particular review | A fixed read-only history snapshot; it does not update with later work or provide project/computer access |

This allocation is a workflow recommendation inferred from documented capabilities. It is not an OpenAI feature that automatically binds three systems into one synchronized project.

Official documentation establishes:
- Space supports shared Pages and access levels; recipient and workspace availability vary. [Space collaboration](https://learn.chatgpt.com/docs/space/collaboration).
- Local conversation sync does not upload an entire local folder to another computer. [Local projects](https://learn.chatgpt.com/docs/projects#use-local-projects-for-folders-and-codebases).
- Codex thread Share creates a read-only snapshot. [Thread snapshots](https://learn.chatgpt.com/docs/use-chatgpt#share-a-read-only-snapshot-of-a-codex-thread).
- Remote connections between desktop devices require the same ChatGPT account and workspace. That is a documented own-device route; it does not establish separate-account collaboration for Mom. [Remote connections](https://learn.chatgpt.com/docs/remote-connections).
- Local environment setup can be stored in the project repository, and Codex supports commit/push/pull-request workflows. [Local environments](https://learn.chatgpt.com/docs/environments/local-environment).

Keep each person's own login. Neither sharing a Page nor transferring project files supplies the other person's Gmail, GitHub, Tripo, Drive or API authentication. Configure those connections under the intended account and actual resource permissions.

## What was verified here

- Space sharing management is enabled for Jay's current account. A complete two-page Space listing returned no accessible Spaces. No specific Space or Mom invitation was tested.
- The local GT-AETERNA folder has no valid Git HEAD/commit, no tracked files and no remote. Inventory found 370 untracked nonignored files. It cannot currently be handed over by saying “clone this repository.”
- Major local directories include about 887 MiB of output, 845 MiB of recovered material, 318 MiB of research and 770 MiB of .git preservation data. These are separate inventories, not the size of a proposed transfer.
- The existing .git must be preserved locally; storage records identify Codex session-preservation content. A new collaboration repository should start from selected working files rather than copying this .git.
- Current specification sheets contain Jay-Mac absolute links. A portable copy needs relative links or shared resource URLs.
- The unanchored research/ ignore rule also ignores output/research/, including current checklists. The handoff must explicitly include those intended documents and use an appropriate clean-repository ignore policy. No ignore rules were changed.
- The README still points to September material. The current entry point should be the October 4 redesign/vendor triage and new-file matrix.

These findings explain why a curated working copy and a current handoff page are necessary.

## Full handoff contents

The core current documents together total about 120 KB. They can be assembled before large optional modeling assets.

1. **START HERE:** purpose, current milestone, owners, read order, folders, current revision, and how to record results.
2. **Current status and decisions:** latest October 4 triage, five vendor states, size/storage distinction, pending files and open questions.
3. **Five design sheets:** Home Run, Court Legend, Legacy Ascend, Black & Gold and Mom's Tough Love, plus their shared architecture matrix. Names and source mappings remain provisional.
4. **New-file intake checklist:** raw STL, appearance GLB/textures, chosen references, scale/units, component roles and engineering status.
5. **Supporting reviews:** manufacturing/capacity, cemetery dimensions, and Tripo/Meshy workflow. Optional API comparison remains deferred while Mom prepares her own Tripo files.
6. **Selected product assets:** the exact current references and incoming new exports, with old source material clearly historical. Do not make the held older document ZIP the active vendor package.
7. **Optional Every Step review:** complete latest review-v7 browser gallery with its images and human-review guide. This remains an appearance/CAD study.
8. **Optional catalog review:** complete catalog HTML and asset dependencies, plus the current PDF. Keep all required image files together; a standalone HTML file is insufficient.
9. **Technical setup:** a portable AGENTS.md for both Macs, only relevant project instructions, tool/setup notes and local environment configuration if required. Each Mac needs its own authorized service configuration.
10. **Manifest:** relative path, revision, size, hash, source/role, units when applicable, and reviewed/accepted/pending status. Keep original exports intact; repaired copies get new revisions.
11. **Connections checklist:** each person's own account access to Drive, repository and Tripo. Choose one sender/owner for vendor emails to avoid conflicting replies.
12. **Progress and decisions log:** one current shared record with links to actual artifacts and explicit owner for the next action.

Private credentials, whole browser/session folders and machine-specific authentication state are outside this handoff. Legacy and preservation material remains on Jay's Mac unless a particular source is deliberately needed.

Current local documents to use when assembling the portable copy:
- [Latest redesign and vendor triage](URN-REDESIGN-AND-VENDOR-TRIAGE-2026-10-04.md).
- [Five-design working matrix](specifications/ARCHITECTURE-AND-SPEC-MATRIX.md).
- [STL intake and engineering checklist](research/new-stl-intake-and-specification-checklist-2026-10-04.md).
- [Human review guide](HUMAN-REVIEW-GUIDE.md).
- [Current Every Step review](../output/cad/review-v7/index.html).
- [Catalog](../output/catalog/index.html).

These links now point to the portable handoff copies. Large editable models require the model download described in the repository README.

## Proposed Space pages

Use one shared AETERNA project Space, if both accounts can be invited through its actual sharing controls:

- **Start Here and Current Status:** goal, read order, active revision and next handoff.
- **Product Designs and Specifications:** design sheet links, appearance decisions, capacity/storage choices.
- **Manufacturers and Quotes:** contacts, what was sent, replies, pricing scope and next action.
- **Design Review:** visual comparisons and specific corrections with artifact links.
- **Decisions and Progress:** dated session updates, owners and unresolved questions.
- **Catalog and Selling Plan:** catalog status and later Amazon work, preserving the current scope.

Confirm both accounts can open/edit the chosen content. Access to linked Drive files must be checked independently. If Space invitations do not support these two accounts, a shared Drive/Google Doc can serve the same decision-log role while the local Codex/repository workflow remains unchanged.

## Current project context Mom should receive

The immediate milestone is to review Mom's forthcoming Tripo exports and produce a new scoped RFQ package.

- Mom is making new Tripo models; no new exports have been received or validated here.
- Larger display version: decorative sculpture plus a separate ash-storage base where capacity works. Roughly 12 inches overall remains a proposed standard.
- Compact version: maximum 10 inches for the whole assembly, with 200 cubic inches (~3.28 L) usable capacity. Storage may be in the full vessel or a connected base/upper chamber. An engineered hollow vessel with an integrated foot is the current recommendation, not an approved model.
- A shallow 7-inch-diameter ×4-inch outside cylindrical base cannot hold 200 in³; its entire envelope is only 153.94 in³ before walls/hardware. Correct dimensions and actual cavity volume are required.
- Sculpteo, 3D Print Joy, Xometry, JawsTec and PrintAWorld received October 4 questions/acknowledgments; Priscilla was copied. New revised files were held.
- 3D Print Joy's raw sample table was found in spam: about $225–$451 per old two-part set, excluding artistic finishing and logistics. These are not new-design prices.
- Keepsakes and jewelry require separate cavity/closure engineering.
- No physical prototype, manufacturing release or new sample purchase was approved in this handoff.
- Current digital-service research, Amazon account work, catalog and Every Step artifacts remain contextual lanes; do not reopen them automatically from older summaries.

## Working routine for visibility

At the start of a session, read the shared current status and pull the latest technical files where Git is used. Choose one work item and record its owner. Keep original artwork exports separate from later repair/modeling revisions.

At the end, update the shared progress Page with:
- what changed;
- exact file/revision links;
- what was checked and what remains unverified;
- a decision or question for the other person;
- the next action and its owner.

Push deliberate source changes for review. Use a separate branch when both people are working on technical files. Keep large model exports in the chosen shared asset location with revision names. This routine provides visibility through artifacts and recorded status; it is not automatic access to the other's private Codex chats.

An instruction in the shared project can ask Codex to prepare/post that update when tools and authorization are available. Do not claim a reliable background synchronization or monitoring system until it has been implemented and tested.

## Setup order and acceptance test

1. Verify Mom's actual ChatGPT login and Space availability; retain her separate account.
2. Select and review the concrete handoff contents. Build the portable copy, fix paths and retain the manifest.
3. Establish shared Space/Page access and shared Drive access with the intended accounts.
4. For the public handoff repository, create/select the clean repo, give Mom access and open a separate local checkout in Codex on each Mac.
5. Connect only needed services under each person's own authorization.
6. Run one small handoff test: Mom opens Start Here, opens a model/reference and catalog/review artifact, updates one spec or adds a Tripo export, and records the result.
7. Jay verifies the same updated Page/file/revision from his account. Confirm there are no broken links or missing dependencies before declaring the handoff complete.

## Starter prompt for Mom

Use after the portable project has actually been prepared and opened in Codex:

> Read START-HERE.md and the current project status. We are working on artistic cremation urns. I am providing new Tripo exports and matching references/specifications. Inventory the files, keep originals unchanged, and distinguish visual artwork from engineered storage geometry. Compare each design with its intended appearance, confirm units and variant/component roles, and list capacity, wall, closure and mounting gaps. Update the shared progress record with exact file/revision links and next actions. Ask before assuming a missing specification or starting paid work. Do not treat historical files or quotes as production-approved new designs.
