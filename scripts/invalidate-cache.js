#!/usr/bin/env node

// Helper script to invalidate CloudFront cache after deployment
const { CloudFrontClient, CreateInvalidationCommand } = require('@aws-sdk/client-cloudfront');
const { exec } = require('child_process');
const util = require('util');
const execAsync = util.promisify(exec);

async function invalidateCache() {
  try {
    console.log('🔄 Creating CloudFront cache invalidation...');
    
    // Get distribution ID from serverless info
    const { stdout } = await execAsync('npx serverless info --verbose');
    const lines = stdout.split('\n');
    let distributionId = '';
    
    lines.forEach(line => {
      if (line.includes('DistributionId:')) {
        distributionId = line.split('DistributionId:')[1].trim();
      }
    });
    
    if (!distributionId) {
      throw new Error('Could not find CloudFront distribution ID. Make sure the stack is deployed.');
    }
    
    // Create CloudFront client
    const cloudfront = new CloudFrontClient({ region: 'us-east-1' });
    
    // Create invalidation
    const command = new CreateInvalidationCommand({
      DistributionId: distributionId,
      InvalidationBatch: {
        Paths: {
          Quantity: 1,
          Items: ['/*'] // Invalidate all paths
        },
        CallerReference: `invalidation-${Date.now()}`
      }
    });
    
    const response = await cloudfront.send(command);
    
    console.log('✅ Cache invalidation created successfully!');
    console.log(`   Invalidation ID: ${response.Invalidation.Id}`);
    console.log(`   Status: ${response.Invalidation.Status}`);
    console.log('\n⏱️  Invalidation typically takes 1-5 minutes to complete.');
    
  } catch (error) {
    console.error('❌ Error creating invalidation:', error.message);
    
    if (error.message.includes('distribution ID')) {
      console.log('\n💡 Make sure you have deployed the stack first:');
      console.log('   npm run deploy');
    } else if (error.name === 'CredentialsProviderError') {
      console.log('\n💡 Make sure your AWS credentials are configured:');
      console.log('   aws configure');
    }
  }
}

invalidateCache();