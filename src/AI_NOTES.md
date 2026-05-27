# AI_NOTES.md

## Was AI used?
Yes, AI assistance was used during development of this project.

## What AI helped with
AI was used to help with:
- Debugging TypeScript errors in React components
- Fixing filtering logic in product search
- Improving state structure (favorites / compare logic)
- Refactoring React components for better props design
- Suggesting improvements for performance (useMemo, includes → Set optimization ideas)

## What was manually reviewed or changed
All changes were manually reviewed and adjusted, including:
- Final decision on state structure (keeping `search` separate from `FilterState`)
- Integration of fixes into existing project architecture
- Validation of UI behavior in header and favorites section
- Ensuring type safety across components

## Example of rejected or corrected AI suggestion
AI initially suggested moving `search` into `FilterState`.  
This was rejected because it would mix UI state with filtering state and reduce clarity of separation of concerns.

## Notes on styling
Some CSS styling suggestions (layout of badges, flex alignment, spacing improvements) were generated with AI assistance and then manually adjusted to match the desired UI design and project structure.