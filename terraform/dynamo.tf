resource "aws_dynamodb_table" "url-shorts" {
  name     = "url-shorts"
  billing_mode = "PAY_PER_REQUEST"
  hash_key = "id"
  attribute {
    name = "id"
    type = "S"
  }
}