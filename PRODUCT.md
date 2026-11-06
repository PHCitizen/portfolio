# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Full-time employers and freelance clients evaluating Jayvee Embog's engineering capabilities are equally important audiences. OJT opportunities are also part of the existing portfolio content; they must not be treated as the exclusive purpose of the site.

## Product Purpose

Present Jayvee Embog's professional experience, technical skills, and projects so prospective employers and clients can evaluate relevant work and make contact.

## Operating Context

Visitors browse a public web portfolio with biography, experience, projects, skills, and contact sections. Existing contact paths include email and GitHub, with email copying supported. Public project repositories provide further technical evidence.

## Capabilities and Constraints

- The existing implementation uses React, TanStack Start/Router, TypeScript, Vite, and Tailwind CSS.
- `info.md` is the user-confirmed factual source of truth. `src/data/portfolio.ts` and component copy must remain consistent with it.
- Text correctness is a critical requirement. Do not invent, exaggerate, or silently reinterpret dates, employment history, qualifications, project outcomes, or availability.
- Preserve supplied dates unless the owner explicitly corrects them. Whether the September–October 2026 milestones describe completed or planned work remains unconfirmed; ask before changing their status or adding new time-sensitive claims.
- The phone number must not be public. Do not restore telephone links or publish the number in site content, metadata, assets, or generated output.
- The current contact copy emphasizes OJT; broader positioning for full-time employment and freelance work is a future copy task, not an approved factual rewrite during initialization.

## Brand Commitments

The portfolio represents Jayvee Embog (EMBOG, JAYVEE B. in the source biography), a backend software engineer based in Angono, Rizal, Philippines. Public contact details retained from the existing content are `embogjayvee@gmail.com` and `https://github.com/PHCitizen`.

## Evidence on Hand

- `info.md`: owner-confirmed source for biography, skills, employment, education, and project descriptions.
- `src/data/portfolio.ts`: current project summaries and technical skill groups.
- `https://github.com/PHCitizen/bch-xmr-swap`: linked open-source atomic-swap project.
- `https://github.com/PHCitizen/bomberman-py`: linked multiplayer game project.
- Source content describes a Monero community bounty and an automated class scheduling thesis project. Do not add supporting metrics, testimonials, or independent-verification claims without evidence.

## Product Principles

1. Factual accuracy takes precedence over persuasive wording.
2. Give full-time employers and freelance clients equal consideration.
3. Help visitors evaluate engineering capability through real work and concrete technical detail.
4. Protect personal privacy: email and GitHub are public contact paths; the phone number is not.

## Open Decisions

- Completion status of the future-dated milestones in `info.md` needs explicit confirmation before any status-sensitive rewrite.
- No product-specific accessibility standard or additional inclusion requirement has been established.
