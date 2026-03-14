#!/usr/bin/env node

// Quick S3 sync script for fast content updates
const { exec } = require('child_process');
const util = require('util');
const path = require('path');
const fs = require('fs');
const execAsync = util.promisify(exec);

async function syncToS3() {
  try {
    console.log('⚡ Quick sync to S3...\n');
    
    // Get bucket name from Terraform output
    const { stdout: outputs } = await execAsync('terraform output -json');
    const outputData = JSON.parse(outputs);
    const bucketName = outputData.s3_bucket_name.value;
    const distributionId = outputData.cloudfront_distribution_id.value;
    
    console.log(`📦 Syncing to bucket: ${bucketName}`);
    
    // Upload Next.js static assets
    console.log('1️⃣ Uploading static assets...');
    await execAsync(`aws s3 sync .next/static s3://${bucketName}/_next/static --delete --profile studio`);
    
    // Upload main index.html
    console.log('2️⃣ Uploading main page...');
    await execAsync(`aws s3 cp .next/server/app/index.html s3://${bucketName}/index.html --content-type "text/html" --profile studio`);
    
    // Upload fonts if they exist
    if (fs.existsSync(path.join(process.cwd(), 'public/fonts'))) {
      console.log('3️⃣ Uploading fonts...');
      await execAsync(`aws s3 sync public/fonts s3://${bucketName}/fonts --profile studio`);
    }
    
    // Upload any other public assets (excluding fonts to avoid duplicates)
    if (fs.existsSync(path.join(process.cwd(), 'public'))) {
      console.log('4️⃣ Uploading other assets...');
      await execAsync(`aws s3 sync public/ s3://${bucketName}/ --exclude "fonts/*" --profile studio`);
    }
    
    // Create CloudFront invalidation
    console.log('5️⃣ Invalidating CloudFront cache...');
    const { stdout: invalidationOutput } = await execAsync(`aws cloudfront create-invalidation --distribution-id ${distributionId} --paths "/*" --profile studio`);
    const invalidation = JSON.parse(invalidationOutput);
    
    console.log('\n✅ Sync Complete!');
    console.log(`🆔 Invalidation ID: ${invalidation.Invalidation.Id}`);
    console.log(`📊 Status: ${invalidation.Invalidation.Status}`);
    console.log('\n⏱️  Changes will be live in 1-5 minutes');
    
  } catch (error) {
    console.error('❌ Sync failed:', error.message);
    
    if (error.message.includes('terraform')) {
      console.log('\n💡 Make sure you have deployed with Terraform first:');
      console.log('   npm run deploy');
    }
    
    if (error.message.includes('aws')) {
      console.log('\n💡 Make sure AWS CLI is configured:');
      console.log('   aws configure --profile studio');
    }
  }
}

syncToS3();