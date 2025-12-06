resource "azurerm_resource_group" "main" {
    name = var.resource_group_info.name
    location = var.resource_group_info.location
  
}

# module "aks" {
#   source  = "Azure/aks/azurerm"
#   version = "11.0.0"
#   # insert the 2 required variables here
#   resource_group_name   = var.resource_group_info.name
#   cluster_name          = var.aks_cluster_info.name
#   location              = var.resource_group_info.location

#   agents_count          = var.aks_cluster_info.count
#   agents_size           = var.aks_cluster_info.size
#   kubernetes_version    = var.aks_cluster_info.version
#   network_plugin        = "azure"
#   os_sku                = "Ubuntu"
#   sku_tier              = "Standard"

#   depends_on = [ azurerm_resource_group.main ]

# }


resource "azurerm_kubernetes_cluster" "aks" {
  name                = var.aks_cluster_info.name
  location            = var.resource_group_info.location
  resource_group_name = var.resource_group_info.name
  dns_prefix          = "exampleaks1"

  default_node_pool {
    name       = "default"
    node_count = var.aks_cluster_info.count
    vm_size    = var.aks_cluster_info.size
  }

  identity {
    type = "SystemAssigned"
  }

  tags = {
    Environment = "Production"
  }
  depends_on = [ azurerm_resource_group.main ]
}

resource "null_resource" "set_kubeconfig" {
  depends_on = [azurerm_kubernetes_cluster.aks]

  provisioner "local-exec" {
    command = <<EOT
az aks get-credentials --resource-group ${azurerm_kubernetes_cluster.aks.resource_group_name} \
    --name ${azurerm_kubernetes_cluster.aks.name} \
    --overwrite-existing
EOT
  }

  triggers = {
    cluster_id = var.set_kubeconfig
  }
  
}
