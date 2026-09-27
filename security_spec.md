# Security Specification - Boiser Educational App

## Data Invariants
1. A teacher can only read or write their own profile.
2. Answer keys, students, grading results, and lesson plans MUST have an `ownerId` matching the teacher's UID.
3. Users cannot modify `createdAt` after document creation.
4. Users cannot modify `ownerId` after document creation (to prevent ownership transfer).
5. Only verified emails are allowed to perform write operations (if verified).

## The "Dirty Dozen" Payloads (Red Team Audit)

1. **Identity Spoofing (UserProfile)**: Create a profile with a `uid` that doesn't match the authenticated user.
2. **Identity Spoofing (AnswerKey)**: Create an answer key with an `ownerId` that doesn't match the authenticated user.
3. **Privilege Escalation**: Attempt to update an existing answer key's `ownerId` to someone else.
4. **PII Blanket Read**: Attempt to read all `/users` documents as a signed-in teacher.
5. **State Shortcut**: Attempt to update a grading result's `depedTransmutedGrade` without recalculating via the app's logic (rules should ideally validate the schema, though complex math is hard in rules).
6. **Resource Poisoning**: Inject a 1MB string into the student `name` field.
7. **Resource Poisoning**: Inject 10,000 items into an `AnswerKey`.
8. **Temporal Integrity**: Create a document with a `createdAt` timestamp set in the past.
9. **Temporal Integrity**: Update a document and change its `createdAt` timestamp.
10. **Cross-Tenant Access**: Attempt to read a student record belonging to another teacher by guessing the `studentId`.
11. **Malicious ID**: Use a document ID containing special characters or path traversals (e.g., `../../hack`).
12. **Orphaned Write**: Create a grading result pointing to a non-existent `studentId` or `keyId` (logic should check `exists()`).

## Test Runner (Simplified for Rules Definition)
*All payloads above must return PERMISSION_DENIED.*
