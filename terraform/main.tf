terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }

  required_version = ">= 0.14.9"
}

provider "aws" {
  region                  = "us-east-1"
  profile                 = "default"
  shared_credentials_file = "~/.aws/credentials"
}

resource "aws_dynamodb_table" "url-shorts" {
  name     = "url-shorts"
  billing_mode = "PAY_PER_REQUEST"
}