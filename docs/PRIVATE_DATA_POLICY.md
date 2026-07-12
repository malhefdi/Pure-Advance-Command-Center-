# Private Data Policy

This repository is a source-code and sanitized-demo repository. It is not an
evidence room, CRM, contract store, document archive, or system of record.

## Never commit

- Personal email addresses, phone numbers, home or delivery addresses, identity
  documents, signatures, QR payloads, or named private correspondence.
- Bank, payment, invoice, receipt, order, transaction, tax, or account details.
- Supplier quotes, contracts, deal terms, customer lists, proprietary market
  extracts, financial models, certificates, regulatory filings, or patent filing
  identifiers unless they are explicitly approved for public release.
- Raw or extracted PDF, Word, spreadsheet, image, archive, OCR, transcript, or
  source-pack files containing any of the above.
- Local filesystem paths, shared-drive locations, access tokens, signed URLs, or
  manifests that reveal private storage structure.

## Where private records belong

Keep source evidence in an access-controlled external system with least-privilege
access, encryption, retention rules, access logs, backups, and an accountable
record owner. Application records should refer to an opaque evidence ID, data
classification, owner, freshness date, and approval state—not a public file path
or embedded source document.

Private data must be delivered to the application through an authenticated,
server-side service that enforces authorization for every record and field. Do
not import private seed data into client components or expose it through public
API routes.

The optional financial workbook is an external private source. It must be
mounted outside the repository and consumed only through the fixed aggregate
adapter described in `FINANCIAL_MODEL_INTEGRATION.md`.

## Safe demo data

Demo records must be synthetic or irreversibly aggregated, visibly labelled
`sanitized demo`, and free of real contact details, contractual terms, filing
numbers, and therapeutic claims. Unknown or withheld values must remain
`unknown` or `withheld`; they must not be represented as verified zeroes.

## Review and incident response

Before each release, scan the entire Git history—not only the current tree—for
credentials, PII, financial records, archives, and binary documents. A normal
deletion commit does not remove data from prior commits. If private data has ever
been committed:

1. Restrict repository access and preserve a private forensic copy.
2. Identify affected records and notify the repository/security owner privately.
3. Rotate or reissue exposed credentials, payment references, or documents as
   appropriate.
4. Rewrite every affected branch and tag, expire cached artifacts, and require
   fresh clones.
5. Confirm removal with a full-history scan before restoring access.

See `SECURITY.md` for private reporting guidance.
