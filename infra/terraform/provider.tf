terraform {
  required_providers {
    azurerm = {
      source = "hashicorp/azurerm"
      version = "4.43.0"
    }
  }
  backend "azurerm" {
    resource_group_name = "blobdemo"
    container_name = "state"
    key = "aks.st.state"
    storage_account_name = "ltaksbackend"
    
  }
}

provider "azurerm" {
  # Configuration options
  features {
    
  }
}