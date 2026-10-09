# Publication checklist

The repository layout, data card, split mapping, schemas, scorer, provenance,
review disclosure and deterministic inventory are ready for upload.

## Publication preparation

- [x] Apply CC BY 4.0 to original dataset material and documentation, and MIT
  to evaluation and validation software.
- [x] Retain source-specific reuse terms and attribution in `NOTICE.md`.
- [x] Set the publisher to Antefact Labs in the citation and release metadata.
- [x] Preserve benchmark rows and sealed review records byte-for-byte.

After changing any file, rebuild the package so `release_manifest.json`,
`checksums.sha256` and the deterministic ZIP are regenerated. Do not hand-edit
the sealed archive.

## Recommended publication steps

- [ ] Upload this folder to `Antefact-Labs/MedReg-S`, preserving Git history.
- [ ] Confirm repository visibility before announcing public availability.
- [ ] Verify both data splits and the remote commit after upload.
- [ ] Run the three shipped validators from a clean environment.
- [ ] Tag the immutable release as `v0.6.0-rc5`.
- [ ] Optionally archive that tag in Zenodo and add the version DOI to
  `CITATION.cff` and the dataset card.
- [ ] Publish at least one reproducible model baseline as a separate result
  artifact; do not edit the benchmark data to add results.

## Transparency decisions already made

- Test references are intentionally public; this is not a hidden leaderboard.
- AI regulatory review is disclosed and is not described as human sign-off.
- The provenance canary is retained.
- No model baseline is fabricated.
- The retained canary is advisory, not an additional licence restriction.
- Earlier MedReg performance scores do not apply to this release.
