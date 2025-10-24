#!/bin/bash
set -e

echo "🏗️  Building production app..."
deno task build

echo "📦 Creating deployment directory..."
rm -rf dist
mkdir -p dist

echo "📋 Copying build output..."
cp -r build dist/

echo "📄 Creating production package.json..."
deno eval "
const pkg = JSON.parse(Deno.readTextFileSync('./package.json'));
const prodPkg = {
  name: pkg.name,
  version: pkg.version,
  type: pkg.type,
  dependencies: pkg.dependencies
};
Deno.writeTextFileSync('dist/package.json', JSON.stringify(prodPkg, null, '\t') + '\n');
"

echo "📥 Installing production dependencies..."
cd dist
deno install
cd ..

echo "🗜️  Compressing for transfer..."
tar -czf dist.tar.gz -C dist .

echo "✅ Production build complete!"
echo ""
echo "📊 Deployment sizes:"
echo "Uncompressed: $(du -sh dist/ | cut -f1)"
echo "Compressed:   $(du -sh dist.tar.gz | cut -f1)"
echo ""
echo "📦 To deploy:"
echo "  1. Transfer dist.tar.gz to your server"
echo "  2. Extract: tar -xzf dist.tar.gz"
echo "  3. Run: deno run -A build/index.js"
