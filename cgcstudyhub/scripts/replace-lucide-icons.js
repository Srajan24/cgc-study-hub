const fs = require('fs');
const path = require('path');

// Icon mappings from lucide-react to CustomIcons
const iconMappings = {
  'Download': 'DownloadIcon',
  'ExternalLink': 'ExternalLinkIcon', 
  'FileText': 'FileTextIcon',
  'ChevronRight': 'ChevronRightIcon',
  'ArrowUp': 'ArrowUpIcon',
  'CheckCircle': 'CheckCircleIcon',
  'Play': 'PlayIcon',
  'Calendar': 'CalendarIcon',
  'User': 'UserIcon',
  'Mail': 'MailIcon',
  'Home': 'HomeIcon',
  'BookOpen': 'BookOpenIcon',
  'Award': 'AwardIcon',
  'Briefcase': 'BriefcaseIcon',
  'Phone': 'PhoneIcon',
  'ChevronDown': 'ChevronDownIcon',
  'ChevronUp': 'ChevronUpIcon',
  'Menu': 'MenuIcon',
  'X': 'XIcon',
  'Moon': 'MoonIcon',
  'Sun': 'SunIcon'
};

function replaceIconsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;
    
    // Check if file has lucide-react imports
    if (!content.includes('from "lucide-react"')) {
      return false;
    }
    
    console.log(`Processing: ${filePath}`);
    
    // Extract current lucide imports
    const importRegex = /import\s*\{\s*([^}]+)\s*\}\s*from\s*["']lucide-react["'];?/g;
    const matches = [...content.matchAll(importRegex)];
    
    if (matches.length === 0) {
      return false;
    }
    
    // Collect all imported icons
    const importedIcons = new Set();
    matches.forEach(match => {
      const icons = match[1].split(',').map(icon => icon.trim());
      icons.forEach(icon => importedIcons.add(icon));
    });
    
    // Build CustomIcons import
    const customIconImports = [];
    importedIcons.forEach(icon => {
      if (iconMappings[icon]) {
        customIconImports.push(iconMappings[icon]);
      }
    });
    
    if (customIconImports.length === 0) {
      return false;
    }
    
    // Replace lucide-react import with CustomIcons import
    content = content.replace(
      /import\s*\{\s*[^}]+\s*\}\s*from\s*["']lucide-react["'];?\n?/g,
      `import { ${customIconImports.join(', ')} } from "../Icons/CustomIcons";\n`
    );
    
    // Replace icon usage in JSX
    importedIcons.forEach(icon => {
      if (iconMappings[icon]) {
        const regex = new RegExp(`<${icon}(\\s[^>]*)?\\s*/>`, 'g');
        content = content.replace(regex, `<${iconMappings[icon]}$1 />`);
        
        const selfClosingRegex = new RegExp(`<${icon}(\\s[^>]*)?\\s*>`, 'g');
        content = content.replace(selfClosingRegex, `<${iconMappings[icon]}$1>`);
      }
    });
    
    // Fix import paths for nested components
    if (filePath.includes('All-Semester')) {
      content = content.replace(
        'from "../Icons/CustomIcons"',
        'from "../../Icons/CustomIcons"'
      );
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    hasChanges = true;
    
    console.log(`✅ Updated: ${filePath}`);
    return hasChanges;
    
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

function findAndReplaceIcons(dir) {
  let totalFiles = 0;
  let updatedFiles = 0;
  
  function processDirectory(currentDir) {
    const files = fs.readdirSync(currentDir);
    
    files.forEach(file => {
      const filePath = path.join(currentDir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        processDirectory(filePath);
      } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
        totalFiles++;
        if (replaceIconsInFile(filePath)) {
          updatedFiles++;
        }
      }
    });
  }
  
  processDirectory(dir);
  
  console.log(`\n📊 Summary:`);
  console.log(`Total files processed: ${totalFiles}`);
  console.log(`Files updated: ${updatedFiles}`);
  console.log(`Files unchanged: ${totalFiles - updatedFiles}`);
}

// Start the replacement process
const srcDir = path.join(__dirname, '../src');
console.log('🚀 Starting lucide-react to CustomIcons replacement...\n');
findAndReplaceIcons(srcDir);
console.log('\n✨ Replacement complete!');
