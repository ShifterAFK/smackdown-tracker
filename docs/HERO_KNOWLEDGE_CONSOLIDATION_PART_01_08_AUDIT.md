# Consolidation input — Batches 01–08

- Artifact: `docs/data/HERO_KNOWLEDGE_CONSOLIDATION_PART_01_08.json`
- Profile capture records: 85
- Unique tracker IDs: 85
- Complete capture records: 40
- Partial capture records: 45
- Section records: 488
- Source manifest/URL/locale/section provenance mismatches: 0

Each capture occurrence is wrapped in the same `hero_capture_record_v1` envelope. The original normalized profile object is preserved intact under `profile_record`; source URL, locale and source-manifest recapture history are standardized alongside it.

This is a consolidation input part, not a merged hero dataset. Repeated partial evidence is intentionally retained. No Supabase writes or application changes.
