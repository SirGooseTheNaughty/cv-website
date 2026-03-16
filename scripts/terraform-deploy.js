#!/usr/bin/env node

// Terraform deployment helper script
const { exec } = require('child_process');
const util = require('util');
const path = require('path');
const fs = require('fs');
const execAsync = util.promisify(exec);

function loadDotEnv() {
  const envPath = path.join(process.cwd(), '.env');

  if (!fs.existsSync(envPath)) {
    return;
  }

  const envFile = fs.readFileSync(envPath, 'utf8');

  for (const line of envFile.split(/\r?\n/)) {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith('#')) {
      continue;
    }

    const separatorIndex = trimmedLine.indexOf('=');
    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmedLine.slice(0, separatorIndex).trim();
    const value = trimmedLine.slice(separatorIndex + 1).trim();

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }

  if (process.env.TELEGRAM_BOT_TOKEN && !process.env.TF_VAR_telegram_bot_token) {
    process.env.TF_VAR_telegram_bot_token = process.env.TELEGRAM_BOT_TOKEN;
  }

  if (process.env.TELEGRAM_CHAT_ID && !process.env.TF_VAR_telegram_chat_id) {
    process.env.TF_VAR_telegram_chat_id = process.env.TELEGRAM_CHAT_ID;
  }
}

async function deployWithTerraform() {
  try {
    console.log('🚀 Deploying CV Website with Terraform\n');
    loadDotEnv();
    
    // Always build fresh for deployment
    console.log('📦 Building Next.js application...');
    await execAsync('npm run build');
    
    console.log('1️⃣ Initializing Terraform...');
    await execAsync('terraform init');
    
    console.log('2️⃣ Planning Terraform deployment...');
    const { stdout: planOutput } = await execAsync('terraform plan');
    console.log(planOutput);
    
    console.log('3️⃣ Applying Terraform configuration...');
    await execAsync('terraform apply -auto-approve');
    
    console.log('4️⃣ Getting deployment outputs...');
    const { stdout: outputs } = await execAsync('terraform output -json');
    const outputData = JSON.parse(outputs);
    
    const bucketName = outputData.s3_bucket_name.value;
    const websiteUrl = outputData.website_url.value;
    const distributionId = outputData.cloudfront_distribution_id.value;
    
    console.log('5️⃣ Uploading website files to S3...');
    
    // Upload Next.js static assets
    await execAsync(`aws s3 sync .next/static s3://${bucketName}/_next/static --delete --profile studio`);
    
    // Upload main index.html
    await execAsync(`aws s3 cp .next/server/app/index.html s3://${bucketName}/index.html --content-type "text/html" --profile studio`);

    // Upload fonts if they exist
    if (fs.existsSync(path.join(process.cwd(), 'public/fonts'))) {
      await execAsync(`aws s3 sync public/fonts s3://${bucketName}/fonts --profile studio`);
    }
    
    // Upload any other public assets
    if (fs.existsSync(path.join(process.cwd(), 'public'))) {
      await execAsync(`aws s3 sync public/ s3://${bucketName}/ --exclude "fonts/*" --profile studio`);
    }
    
    console.log('6️⃣ Creating CloudFront invalidation...');
    await execAsync(`aws cloudfront create-invalidation --distribution-id ${distributionId} --paths "/*" --profile studio`);
    
    console.log('\n✅ Deployment Complete!');
    console.log(`🌐 Website URL: ${websiteUrl}`);
    console.log(`🪣 S3 Bucket: ${bucketName}`);
    console.log(`🌍 CloudFront Distribution ID: ${distributionId}`);
    
    console.log('\n📋 Next Steps:');
    console.log('1. Wait 5-10 minutes for CloudFront deployment');
    console.log('2. Visit your website URL to verify deployment');
    console.log('3. For custom domain: create SSL certificate in us-east-1 and update terraform.tf');
    
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    
    if (error.message.includes('terraform')) {
      console.log('\n💡 Make sure Terraform is installed:');
      console.log('   Download from: https://terraform.io/downloads');
    }
    
    if (error.message.includes('aws')) {
      console.log('\n💡 Make sure AWS CLI is configured:');
      console.log('   aws configure --profile studio');
    }
  }
}

deployWithTerraform();