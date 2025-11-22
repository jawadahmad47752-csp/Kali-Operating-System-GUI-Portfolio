# Customizing Your Kali Linux Portfolio

Your portfolio is designed to be fully dynamic. You can update all your personal information, projects, and experience by editing a single file.

## 1. Update Your Information
Open `src/data.ts`. This file contains all the data used by the application.

### Personal Info
Update the `USER_DATA` object with your details:
```typescript
export const USER_DATA = {
  name: "Your Name",
  role: "Your Job Title",
  bio: "Your short bio...",
  // ...
};
```

### Projects
Add or edit projects in the `PROJECTS` array. Each project will automatically appear in the "My Projects" file explorer.
```typescript
export const PROJECTS = [
  {
    id: "proj1",
    title: "Project Name",
    description: "Description...",
    techStack: ["React", "Node.js"], // These appear as tags
    link: "https://github.com/...",
  },
  // Add more projects here
];
```

### Experience
Update the `EXPERIENCE` array. (Note: You may need to implement the `ExperienceViewer` component to fully display this if it's not already done).

### Desktop Icons
You can add new desktop shortcuts by adding to `DESKTOP_ICONS`.
```typescript
export const DESKTOP_ICONS = [
  // ... existing icons
  { id: "new-app", label: "New App", icon: SomeIcon, component: "ComponentName" },
];
```
*Note: If you add a new component, you also need to register it in `src/components/layout/Desktop.tsx` in the `COMPONENT_MAP`.*

## 2. Changing the Background
To change the desktop background, edit `src/components/layout/Desktop.tsx`:
```typescript
backgroundImage: "url('YOUR_IMAGE_URL')"
```

## 3. Terminal Customization
The terminal commands are defined in `src/components/apps/Terminal.tsx`. You can add new commands in the `handleCommand` function.
