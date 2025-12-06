variable "resource_group_info" {
    type = object({
      name = string
      location = string
    })
    default = {
      name = "myresourcegroup"
      location = "eastus"
    }
  
}

variable "aks_cluster_info" {
    type = object({
      name = string
      count = number
      size = string
      version = string
    })
    default = {
      name = "aksshopcluster-qa"
      count = 3
      size = "Standard_B2ms"
      version = "1.31"
    }
  
}

variable "set_kubeconfig" {
    type = string
    default = "1.0"
  
}