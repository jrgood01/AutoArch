![alt text](https://github.com/jrgood01/AutoArch/blob/main/screenshot_final.png)

# Auto Architecture
Auto Architecture is a web application that leverages the power of GPT-4 to automatically generate and visualize recommended AWS architectures based on a user's project description. This is an experiment into automated infastructure suggestions.
## Running the project
### With docker
    - run docker-compose up
### Without docker
    - Navigate to the API folder and run "uvicorn server:app" to run the backend
    - Navigate to the autoarch-frontend directory and run "npm run dev"
## Credits:
    - shadcn (ui components): https://ui.shadcn.com/
    - D3.js (for graph visualisation): https://d3-graph-gallery.com/
    - Gaurdrails AI: https://shreyar.github.io/guardrails/
    - Nextjs: https://nextjs.org/
    - FastAPI: https://fastapi.tiangolo.com/lo/
    
## Project structure
    - api: A fastapi api that uses guardrails + openAI API to return AWS architecture   suggestions
    - autoarch-frontend: A nextjs project containing the frontend for the app 

## Feature Backlog:
    - Agent to convert suggestion into terraform script
    - User authentication and project saving functionality
    - Built-in cost estimation and optimization features
    - In-depth architecture explanations and best practices suggestions

# Contributing

We're excited that you're interested in contributing to Auto Architecture! This guide will help you get started and set expectations about the process. Please join the project [discord server](https://discord.gg/4D3T3rHF) for updates. You can also ask questions about contributing or setting up the development environment here.

## Getting Started
Fork the Repository: The first step in contributing is to fork our repository. This will create a copy of the repository in your own GitHub account that you can make changes to.

Clone Your Forked Repository: After you've forked the repository, clone it to your local machine so you can begin making changes.

Create a Branch: Make a new branch for your changes. This keeps your work separate from other changes and makes it easier for us to review and incorporate your contributions.

## Making Changes
Review the Issues Page: We track all bugs, enhancements, and features on the repository's issues page. If you're looking for somewhere to start, this is a good place.

Make Your Changes: Make the changes you'd like to contribute. Try to keep your changes focused and within the scope of the issue you're addressing.

Test Your Changes: Before submitting your changes, please make sure they work as expected and don't introduce new problems.

## Submitting Your Changes
Push to Your Fork: Once you're ready to submit your changes, push them to your forked repository on GitHub.

Submit a Pull Request: From your forked repository, submit a pull request to our repository. In the pull request, describe the changes you've made and any issues they address.

After You Submit
Wait for Review: We aim to review and respond to pull requests within 3 business days.

Respond to Feedback: If we ask for changes or have questions about your pull request, please respond. We're working together to improve the project, and your insights are valuable!

Join the Discord Server: For additional discussions, queries, or to connect with the community, join our Discord server.

## Code of Conduct
By contributing, you agree to adhere to our Contributor Covenant. This helps ensure a welcoming and inclusive environment for everyone involved in the project.

Remember, everyone you're working with is a volunteer, just like you. Be kind and patient with each other.

Thank you for your interest in our project, and we look forward to seeing your contributions!
