![alt text](https://github.com/jrgood01/AutoArch/blob/main/screenshot_final.png)

# Auto Architecture
Auto Architecture is a web application that leverages the power of GPT-4 to automatically generate and visualize recommended AWS architectures based on a user's project description. This is an experiment into automated infastructure suggestions.
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
