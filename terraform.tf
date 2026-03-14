# Configure the AWS Provider
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region  = "eu-west-1"
  profile = "studio"
}

# Variables
variable "domain_name" {
  description = "Domain name for the CV website"
  type        = string
  default     = "sergey-v.com"
}

variable "bucket_name" {
  description = "S3 bucket name for static website"
  type        = string
  default     = "cv-website-sergey-v"
}

# S3 bucket for static website hosting
resource "aws_s3_bucket" "cv_website" {
  bucket = var.bucket_name

  tags = {
    Name        = "CV Website"
    Environment = "production"
  }
}

resource "aws_s3_bucket_website_configuration" "cv_website" {
  bucket = aws_s3_bucket.cv_website.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"  # For SPA routing
  }
}

resource "aws_s3_bucket_versioning" "cv_website" {
  bucket = aws_s3_bucket.cv_website.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "cv_website" {
  bucket = aws_s3_bucket.cv_website.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# S3 bucket public access settings (secure - only CloudFront can access)
resource "aws_s3_bucket_public_access_block" "cv_website" {
  bucket = aws_s3_bucket.cv_website.id

  block_public_acls       = true
  block_public_policy     = false
  ignore_public_acls      = true
  restrict_public_buckets = false
}

# S3 bucket policy for CloudFront OAI access
resource "aws_s3_bucket_policy" "cv_website" {
  bucket = aws_s3_bucket.cv_website.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "AllowCloudFrontAccess"
        Effect    = "Allow"
        Principal = {
          AWS = aws_cloudfront_origin_access_identity.cv_website.iam_arn
        }
        Action   = "s3:GetObject"
        Resource = "${aws_s3_bucket.cv_website.arn}/*"
      },
    ]
  })

  depends_on = [aws_s3_bucket_public_access_block.cv_website]
}

# CloudFront Origin Access Identity
resource "aws_cloudfront_origin_access_identity" "cv_website" {
  comment = "CV Website OAI"
}

# CloudFront Distribution
resource "aws_cloudfront_distribution" "cv_website" {
  comment             = "CV Website - Static Site Distribution"
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  price_class         = "PriceClass_100"  # US, Canada and Europe

  # Uncomment and configure when you have SSL certificate
  aliases = [var.domain_name]

  origin {
    domain_name = aws_s3_bucket.cv_website.bucket_regional_domain_name
    origin_id   = "S3-${var.bucket_name}"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.cv_website.cloudfront_access_identity_path
    }
  }

  default_cache_behavior {
    target_origin_id       = "S3-${var.bucket_name}"
    viewer_protocol_policy = "redirect-to-https"
    compress               = true

    allowed_methods = ["GET", "HEAD", "OPTIONS"]
    cached_methods  = ["GET", "HEAD"]

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    # Cache HTML files for shorter time, static assets longer
    min_ttl     = 0
    default_ttl = 86400   # 1 day
    max_ttl     = 31536000 # 1 year
  }

  # Cache behavior for static assets
  ordered_cache_behavior {
    path_pattern           = "/_next/static/*"
    target_origin_id       = "S3-${var.bucket_name}"
    viewer_protocol_policy = "redirect-to-https"
    compress               = true

    allowed_methods = ["GET", "HEAD"]
    cached_methods  = ["GET", "HEAD"]

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    min_ttl     = 31536000 # 1 year
    default_ttl = 31536000 # 1 year  
    max_ttl     = 31536000 # 1 year
  }

  # Custom error responses for SPA routing
  custom_error_response {
    error_code         = 404
    response_code      = 200
    response_page_path = "/index.html"
  }

  custom_error_response {
    error_code         = 403
    response_code      = 200
    response_page_path = "/index.html"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
    # Uncomment when you have SSL certificate in us-east-1
    acm_certificate_arn      = "arn:aws:acm:us-east-1:262043365598:certificate/b24c44f1-672f-428e-b292-9d632253f29f"
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  tags = {
    Name        = "CV Website Distribution"
    Environment = "production"
  }
}

# Outputs
output "website_url" {
  description = "CloudFront distribution URL"
  value       = "https://${aws_cloudfront_distribution.cv_website.domain_name}"
}

output "s3_bucket_name" {
  description = "Name of the S3 bucket"
  value       = aws_s3_bucket.cv_website.id
}

output "cloudfront_distribution_id" {
  description = "CloudFront Distribution ID"
  value       = aws_cloudfront_distribution.cv_website.id
}

output "s3_bucket_website_endpoint" {
  description = "S3 bucket website endpoint"
  value       = aws_s3_bucket_website_configuration.cv_website.website_endpoint
}