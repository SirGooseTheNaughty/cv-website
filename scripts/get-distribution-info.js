#!/usr/bin/env node

// Helper script to get CloudFront distribution details after deployment
const { exec } = require('child_process');
const util = require('util');
const execAsync = util.promisify(exec);

async function getDistributionInfo() {
  try {
    console.log('🔍 Getting CloudFront distribution information...\n');
    
    // Get stack outputs
    const { stdout } = await execAsync('npx serverless info --verbose');
    
    // Parse the outputs
    const lines = stdout.split('\n');
    let websiteURL = '';
    let cloudFrontURL = '';
    let distributionId = '';
    
    lines.forEach(line => {
      if (line.includes('WebsiteURL:')) {
        websiteURL = line.split('WebsiteURL:')[1].trim();
      }
      if (line.includes('CloudFrontURL:')) {
        cloudFrontURL = line.split('CloudFrontURL:')[1].trim();
      }
      if (line.includes('DistributionId:')) {
        distributionId = line.split('DistributionId:')[1].trim();
      }
    });
    
    console.log('📋 Distribution Information:');
    console.log(`   Custom Domain URL: ${websiteURL}`);
    console.log(`   CloudFront URL:    ${cloudFrontURL}`);
    console.log(`   Distribution ID:   ${distributionId}`);
    
    console.log('\n📝 DNS Configuration:');
    console.log('   Add the following DNS record to your domain:');
    console.log(`   Type: CNAME (or A record alias)`);
    console.log(`   Name: @ (for root domain) or subdomain name`);
    console.log(`   Value: ${cloudFrontURL.replace('https://', '')}`);
    
    console.log('\n⏱️  Note: DNS propagation may take 5-60 minutes');
    console.log('   You can check propagation status at: https://www.whatsmydns.net/');
    
  } catch (error) {
    console.error('❌ Error getting distribution info:', error.message);
    console.log('\n💡 Make sure you have deployed the stack first:');
    console.log('   npm run deploy');
  }
}

getDistributionInfo();