# GitHub Setup Instructions

Follow these steps to create your GitHub repository and upload the project:

## Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Fill in the details:
   - **Repository name**: `pet-matcher-app`
   - **Description**: "Smart web application matching potential pet owners with their ideal companion from local shelters"
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README (we already have one)
5. Click "Create repository"

## Step 2: Initialize Git and Push to GitHub

Open your terminal and navigate to the project folder, then run these commands:

```bash
# Navigate to the project directory
cd pet-matcher-app

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Pet Matcher App with matching algorithm and concept maps"

# Add your GitHub repository as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/pet-matcher-app.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Verify Upload

1. Refresh your GitHub repository page
2. You should see all the project files including:
   - README.md
   - package.json
   - src/ folder with all components
   - public/ folder
   - Configuration files

## Alternative: Using GitHub Desktop

If you prefer a GUI:

1. Download and install [GitHub Desktop](https://desktop.github.com/)
2. Open GitHub Desktop
3. Click "File" → "Add Local Repository"
4. Browse to your `pet-matcher-app` folder
5. Click "Publish repository"
6. Fill in repository name and description
7. Choose visibility (public/private)
8. Click "Publish Repository"

## What's Included

Your repository now contains:

### Main Application
- **PetMatchingApp.jsx** - The working demo application with questionnaire and matching

### Concept Maps
- **UserJourneyMap.jsx** - Interactive user journey visualization
- **SystemArchitecture.jsx** - System architecture layers and components
- **MatchingAlgorithm.jsx** - Detailed algorithm explanation with example

### Configuration
- **package.json** - All dependencies
- **tailwind.config.js** - Tailwind CSS setup
- **.gitignore** - Files to exclude from Git
- **README.md** - Complete project documentation

## Next Steps

After pushing to GitHub:

1. **Add a License**: Go to your repo → Add file → Create new file → Name it "LICENSE" → Choose a license template
2. **Enable GitHub Pages** (optional): Settings → Pages → Deploy from branch → Select main branch
3. **Add Topics**: On your repo page, click the gear icon next to "About" and add topics like: `react`, `pet-adoption`, `shelter`, `matching-algorithm`
4. **Star Your Repo**: Show it some love! ⭐

## Troubleshooting

**If you get "repository already exists":**
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/pet-matcher-app.git
git push -u origin main
```

**If you need to use SSH instead of HTTPS:**
```bash
git remote set-url origin git@github.com:YOUR_USERNAME/pet-matcher-app.git
```

**If you get authentication errors:**
- You may need to set up a [Personal Access Token](https://github.com/settings/tokens)
- Or configure [SSH keys](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)

## Running the Project Locally

After cloning from GitHub:

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

---

Need help? Open an issue on GitHub or check the [GitHub Docs](https://docs.github.com).
