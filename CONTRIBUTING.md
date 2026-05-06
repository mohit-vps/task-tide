# Contributing to Task Tide

Thanks for taking the time to improve Task Tide. This project is intentionally small: it is a plain HTML, CSS, and JavaScript to-do app that runs directly in the browser.

## Getting Started

1. Clone the repository.
2. Open `index.html` in a browser.
3. Make your changes in `index.html`, `styles.css`, or `script.js`.
4. Refresh the browser to test your work.

No build step or package install is required.

## Development Guidelines

- Keep the app dependency-free unless a dependency clearly solves a real problem.
- Prefer readable, small functions over broad rewrites.
- Preserve keyboard and screen-reader usability when changing controls.
- Keep task data compatible with the existing `localStorage` format when possible.
- Match the existing code style: two-space indentation in HTML, CSS, and JavaScript, double quotes in JavaScript, and concise class names in CSS.

## Manual Testing

Before opening a pull request, verify the core task flow in a browser:

- Add a task.
- Mark a task complete and active again.
- Edit a task.
- Delete a task.
- Filter by all, active, and done.
- Clear completed tasks.
- Refresh the page and confirm tasks persist.

Also check that the layout works on both desktop and mobile widths.

## Pull Requests

- Keep pull requests focused on one change or fix.
- Explain what changed and why.
- Include manual testing notes.
- Add screenshots for visual changes when useful.
- Call out any behavior changes that could affect saved tasks.

## Issues

When reporting a bug, include:

- What happened.
- What you expected to happen.
- Steps to reproduce the issue.
- Browser and device details, if relevant.
