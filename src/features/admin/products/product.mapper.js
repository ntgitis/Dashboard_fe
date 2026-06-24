export function mapProductFromApi(product) {
  return {
    id: product.id,
    name: product.name ?? product.productName,
    sku: product.sku,
    category: product.category,
    price: product.price ?? product.unitPrice,
    stock: product.stock ?? product.quantityInStock,
    status: product.status,
    image: product.image ?? "📦",
  };
}

export function mapProductToApi(formData) {
  return {
    name: formData.name,
    sku: formData.sku,
    category: formData.category,
    price: formData.price,
    stock: formData.stock,
    status: formData.status,
  };
}
