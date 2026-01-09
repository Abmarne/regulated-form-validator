### Contributing to Regulated Form Validator
🎉 First off, thank you for considering contributing to **Regulated Form Validator!**
This project aims to make **compliance‑ready form validation** simple, declarative, and auditor‑friendly for domains like BFSI and healthcare. Contributions from the community are what make open source thrive.

### 📋 Code of Conduct
We follow the Contributor [Covenant Code](https://www.contributor-covenant.org/) of Conduct.
Please be respectful, collaborative, and constructive in all interactions.

### 🛠 How to Contribute
1. **Reporting Issues**
- Use the GitHub Issues (github.com in Bing) tab.
- Provide clear steps to reproduce the bug.
- Include screenshots, YAML/JSON configs, or test cases if possible.
- Label issues appropriately (bug, enhancement, documentation, etc.).
2. **Suggesting Enhancements**
- Open an issue describing your idea.
- Explain why it’s useful (e.g., new BFSI/healthcare field, better UX, stricter validation).
- If possible, propose a draft YAML/JS snippet to illustrate.
3. **Submitting Pull Requests**
- Fork the repo and create a new branch (feature/my-enhancement or fix/bug-name).
- Ensure your code follows the project’s style and passes all tests.
- Add or update unit tests in tests/validator.test.js.
- Update documentation (README.md, CONTRIBUTION.md, or field presets) if needed.
- Submit a PR with a clear description of changes.

### ✅ Development Setup
- Clone the repo:
```
git clone https://github.com/<your-username>/regulated-form-validator.git
cd regulated-form-validator
```
- Install dependencies:
```
npm install
```
- Run tests:
```
npm test
```
- Start local demo (example->App.jsx):
```
npm run dev
```

### 🧪 Testing Guidelines
- All new fields must include positive and negative test cases.
- Use validateField and validateAll in Jest tests.
- Ensure strict rules (regex, length, allowedChars, cross‑field) are covered.
- Example:
```
test("PANField valid and invalid", async () => {
  expect(await validateField(PANField, "ABCDE1234F")).toEqual({ valid: true });
  expect((await validateField(PANField, "1234")).valid).toBe(false);
});
```

### 📖 Documentation
- Update `README.md` with new features or usage examples.
- Add YAML/JSON config samples for new fields.
- Keep error messages clear and auditor‑friendly.

### 🔄 Release Process
- All merges to `main` must pass CI tests.
- Versioning follows [Semantic Versioning](https://semver.org/).
- New releases are published to npm after review.

### 🙌 Recognition
Contributors will be credited in the **README** and GitHub releases.
Your feedback, ideas, and code help make compliance‑ready forms developer‑friendly and audit‑ready.
