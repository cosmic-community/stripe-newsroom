const fs = require('fs')
const path = require('path')

const SCRIPT_TAG = '<script src="/dashboard-console-capture.js"></script>'

function injectIntoFile(filePath) {
  try {
    let html = fs.readFileSync(filePath, 'utf8')
    if (html.includes('dashboard-console-capture.js')) return
    if (html.includes('</head>')) {
      html = html.replace('</head>', `${SCRIPT_TAG}</head>`)
      fs.writeFileSync(filePath, html, 'utf8')
    }
  } catch (err) {
    // Ignore files that cannot be read/written
  }
}

function walk(dir) {
  if (!fs.existsSync(dir)) return
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(fullPath)
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      injectIntoFile(fullPath)
    }
  }
}

const targets = [
  path.join(process.cwd(), 'out'),
  path.join(process.cwd(), '.next', 'server', 'app'),
]
targets.forEach(walk)

console.log('Console capture script injection complete.')