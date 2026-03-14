# Custom Domain Setup Guide

This guide will help you set up a custom domain for your CV website on AWS CloudFront.

## Prerequisites

1. **Domain Name**: You own a domain name (e.g., `johndoe.com`)
2. **AWS Account**: Access to AWS Console with permissions for:
   - Certificate Manager (ACM)
   - Route 53 (if using AWS for DNS)
   - CloudFront
   - S3

## Step-by-Step Setup

### Step 1: Update Domain Configuration

1. Open `serverless.yml`
2. Replace `your-domain.com` with your actual domain name
3. Choose your subdomain preference:
   - Root domain: `johndoe.com`
   - Subdomain: `cv.johndoe.com` or `www.johndoe.com`

### Step 2: Request SSL Certificate

**Important**: The certificate MUST be created in the `us-east-1` region (N. Virginia) for CloudFront.

#### Option A: Using AWS Console
1. Go to [AWS Certificate Manager](https://console.aws.amazon.com/acm/home?region=us-east-1)
2. Click "Request a certificate"
3. Choose "Request a public certificate"
4. Enter your domain name(s):
   - For root domain: `johndoe.com` and `*.johndoe.com`
   - For subdomain: `cv.johndoe.com`
5. Choose "DNS validation"
6. Add tags if needed
7. Click "Request"

#### Option B: Using AWS CLI
```bash
aws acm request-certificate \
  --domain-name your-domain.com \
  --subject-alternative-names *.your-domain.com \
  --validation-method DNS \
  --region us-east-1
```

### Step 3: Validate the Certificate

1. In ACM console, click on your certificate
2. Copy the CNAME record details
3. Add the CNAME record to your domain's DNS:
   - **Name**: The validation record name
   - **Value**: The validation record value
   - **Type**: CNAME

**Wait for validation** (can take 5-30 minutes)

### Step 4: Update Serverless Configuration

1. Copy the certificate ARN from ACM console
2. Update `serverless.yml`:
   ```yaml
   certificateArn: arn:aws:acm:us-east-1:123456789012:certificate/your-certificate-id
   ```

### Step 5: Deploy Your Site

```bash
npm run deploy
```

### Step 6: Configure DNS

After deployment, get the CloudFront distribution domain name and configure your DNS:

#### For Root Domain (johndoe.com):
- **Type**: A Record (Alias)
- **Name**: @ (or blank)
- **Value**: Your CloudFront distribution domain (e.g., `d123456789.cloudfront.net`)

#### For Subdomain (cv.johndoe.com):
- **Type**: CNAME
- **Name**: cv
- **Value**: Your CloudFront distribution domain

#### Using Route 53 (Recommended):
1. Create a hosted zone for your domain
2. Create an A record with "Alias" pointing to your CloudFront distribution
3. Update your domain registrar's nameservers to Route 53's nameservers

## Verification

1. Wait for DNS propagation (5-60 minutes)
2. Visit your custom domain: `https://your-domain.com`
3. Verify SSL certificate is valid (green lock icon)

## Troubleshooting

### Certificate Issues
- Ensure certificate is in `us-east-1` region
- Verify DNS validation records are correct
- Wait for "Issued" status before deploying

### DNS Issues
- Use `nslookup your-domain.com` to verify DNS propagation
- Check TTL settings (lower TTL for faster updates during setup)
- Verify CNAME/A record points to correct CloudFront domain

### CloudFront Issues
- Distribution deployment can take 15-20 minutes
- Clear browser cache and try incognito mode
- Check CloudFront invalidation if content doesn't update

## Cost Considerations

- **Certificate**: Free with AWS Certificate Manager
- **CloudFront**: Pay for data transfer and requests
- **Route 53**: ~$0.50/month per hosted zone + query charges
- **Domain**: Annual registration fee (varies by registrar)

## Security Best Practices

1. Enable HTTPS redirect (configured automatically)
2. Use minimum TLS 1.2 (configured)
3. Consider enabling AWS WAF for additional protection
4. Set up CloudWatch monitoring for your distribution

## Next Steps

After setup:
1. Configure Route 53 health checks
2. Set up CloudWatch alarms
3. Consider adding a CDN cache invalidation to your deployment script
4. Set up monitoring and analytics