terraform {
  required_version = "~> 1.4.5"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

variable "repository" {
  type = string
}

variable "credential" {
  type = string
}

resource "aws_lightsail_key_pair" "key_pair_ton_countapi" {
  name       = "key_pair_ton_countapi"
  public_key = file("~/.ssh/id_rsa.pub")
}

resource "aws_lightsail_instance" "ton_countapi" {
  name              = "ton_countapi"
  availability_zone = "us-east-1a"
  blueprint_id      = "ubuntu_20_04"
  bundle_id         = "micro_2_0"
  key_pair_name     = aws_lightsail_key_pair.key_pair_ton_countapi.name

  provisioner "remote-exec" {
    connection {
      user = "ubuntu"
      host = aws_lightsail_instance.ton_countapi.public_ip_address
      port = 22
      type = "ssh"
    }
    inline = [
      "sudo apt update",
      "sudo apt install -y git apt-transport-https ca-certificates curl gnupg lsb-release",
      "git config --global credential.helper 'store --file ~/.git-credentials'",
      "echo '${var.credential}' | tee ~/.git-credentials",
      "git clone ${var.repository}",
      "curl -fsSL https://get.docker.com -o get-docker.sh",
      "sudo sh get-docker.sh",
      "cd challenge_ton_countapi/",
      "echo 'ENV PUBLIC_IP=${aws_lightsail_instance.ton_countapi.public_ip_address}' >> Dockerfile",
      "sudo docker compose up -d",
    ]
  }
}

resource "aws_lightsail_instance_public_ports" "public_ports_ton_countapi" {
  instance_name = aws_lightsail_instance.ton_countapi.name
  port_info {
    from_port = 3000
    to_port   = 3000
    protocol  = "tcp"
  }
  port_info {
    from_port = 80
    to_port   = 80
    protocol  = "tcp"
  }
  port_info {
    from_port = 22
    to_port   = 22
    protocol  = "tcp"
  }
}

output "public_ip_address" {
  value = aws_lightsail_instance.ton_countapi.public_ip_address
}
